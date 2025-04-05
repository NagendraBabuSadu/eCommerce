import { Request, Response, NextFunction } from "express";
import orderModel from "../models/order.model.js";
import cartModel from "../models/cart.model.js";

const addOrder = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
  const userId = req.user?.id;
  try {
    const userCart = await cartModel.findOne({ userId });

    const products = userCart?.products as OrderProduct[] | undefined;
    
    if (!products || products?.length === 0) {
      return res
        .status(400)
        .json({ msg: "Cart is empty. Cannot place order." });
    }

    type OrderProduct = {
      productName: string;
      quantity: number;
      price: number;
    };

    const totalOrderPrice = products?.reduce(
      (acc: number, item: OrderProduct) => acc + item.quantity * item.price,
      0
    );

    const newOrder = await orderModel.create({
      userId,
      products: products,
      totalPrice: totalOrderPrice,
      paymentStatus: "pending",
    });

    await cartModel.updateOne({ userId }, { $set: { products: [] } });

    res.status(200).json({ msg: "Order created", orderDetails: newOrder });
  } catch (error) {
    console.error("Error creating order:", error); // Log the full error
    if(error instanceof Error)
    res
      .status(500)
      .json({ msg: "Error creating order", error: error.message || error });
  }
};

export { addOrder };
