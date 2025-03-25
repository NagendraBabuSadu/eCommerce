import { Request, Response, NextFunction } from "express";
import productModel from "../models/product.model.js";

const getProductByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query;
    const products = await productModel.find({
      name: new RegExp(name, "i"),
    });
    res.status(200).json({
      msg: "success",
      Products: products,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error finding products", error });
  }
};


const getProductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category } = req.query;
    const products = await productModel.find({
      category: new RegExp(category, "i"),
    });
    res.status(200).json({ msg: "success", products });
  } catch (error) {
    res.status(500).json({ msg: "Error finding products", error });
  }
};

export { getProductByName, getProductsByCategory };
