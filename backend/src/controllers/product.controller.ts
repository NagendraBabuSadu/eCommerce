import { Request, Response, NextFunction } from "express";
import productModel from "../models/product.model.js";
import { createProduct } from "../validators/product.validator.js";
import mongoose from "mongoose";
import {
  getProductByName,
  getProductsByCategory,
} from "../middlewares/getProduct.js";

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createPayload = req.body;
    const parsedPayload = createProduct.safeParse(createPayload);
    if (!parsedPayload.success) {
      res.status(400).json({ msg: "You sent wrong input" });
      return;
    }

    const newProduct = await productModel.create({
      productName: createPayload.productName,
      price: createPayload.price,
      description: createPayload.description,
      category: createPayload.category,
      image: createPayload.image,
    });

    await newProduct.save();
    res.status(200).json({ msg: "Product created", product: newProduct });
  } catch (error) {
    res.status(500).json({ msg: "Error creating product", error });
  }
};



const categoryMap: Record<string, string> = {
  men: "clothing",
  women: "clothing",
  mobiles: "electronics",
  laptops: "electronics",
  cameras: "electronics",
  furniture: "home",
  appliances: "home",
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let category = req.query.category as string;
    
    // Convert subcategory to main category if applicable
    if (category && categoryMap[category]) {
      category = categoryMap[category];
    }

    // Fetch products based on category or get all if no category is provided
    const products = category
      ? await productModel.find({ category })
      : await productModel.find();
    res.status(200).json(products);

    
  } catch (error) {
    res.status(500).json({ msg: "Error fetching products", error });
  }
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.params;
    if (mongoose.Types.ObjectId.isValid(_id)) {
      const product = await productModel.findById(_id);

      res.status(200).json({
        msg: "success",
        Product: product,
      });
    } else {
      res.status(400).json({ msg: "Invalid product ID" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error finding product", error });
  }
};

export { addProduct, getProducts, getProduct, getProductByName };
