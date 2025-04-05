import { Request, Response, NextFunction } from "express";
import cartModel from "../models/cart.model.js";
import { createCart } from "../validators/cart.validators.js";
import productModel from "../models/product.model.js";

const addCartProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise <void>=>  {
  const userId = req.user?.id; // Extract from authenticated request
  try {
    const createPayload = req.body;
    const parsedPayload = createCart.safeParse(createPayload);
    console.log("=========>", req.body);

    if (!parsedPayload.success) {
      console.log("Validation Error:", parsedPayload.error);
      return void res
        .status(400)
        .json({ msg: "You sent wrong input", errors: parsedPayload.error });
    }

    type CartProduct = {
      productName: string;
      quantity: number;
      price: number
    };

    // Ensure products is an array
    if (!Array.isArray(createPayload.products)) {
      console.error("Invalid products format:", createPayload.products);
      return void res.status(400).json({ msg: "Products must be an array" });
    }

    const productsWithIds = await Promise.all(
      createPayload.products.map(async (item: CartProduct) => {
        console.log("item: ", item);
        const product = await productModel.findOne({
          productName: {
            $regex: new RegExp(`^${item.productName.trim()}$`, "i"),
          },
        });
        if (!product) {
          throw new Error(`Product not found: ${item.productName}`);
        }
        return {
          product: product._id,
          productName: product.productName,
          price: product.price,
          quantity: item.quantity,
        };
      })
    );

    const newCart = await cartModel.findOneAndUpdate(
      { userId },
      {
        $set: { userId },
        $push: {
          products: {
            $each: productsWithIds,
          },
        },
      },
      { new: true, upsert: true } // Create cart if it doesn't exist
    );

    res.status(200).json({ msg: "Cart created", cartDetails: newCart });
  } catch (error) {
    console.error("Error creating cart:", error); // Log the full error
    if(error instanceof Error)
    res
      .status(500)
      .json({ msg: "Error creating cart", error: error.message || error });
  }
};

const getCartProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const getUserCartDetails = await cartModel.findOne({
      userId,
    });

    if (!userId) {
      return void res.status(411).json({
        message: "User not found.",
      });
    }
    // Check if the cart exists
    if (!getUserCartDetails) {
      return void res.status(404).json({ message: "Cart not found for the user." });
    }

    res.status(200).json({
      message: "success",
      cartDetails: getUserCartDetails,
    });
  } catch (error) {
    console.error("Error getting cart:", error); // Log the full error
    if(error instanceof Error)
    res
      .status(500)
      .json({ msg: "Error getting cart", error: error.message || error });
  }
};

export { addCartProducts, getCartProducts };
