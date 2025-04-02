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
      image: createPayload.image
    });

    await newProduct.save();
    res.status(200).json({ msg: "Product created", product: newProduct });
  } catch (error) {
    res.status(500).json({ msg: "Error creating product", error });
  }
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.query.name) {
      getProductByName(req, res, next); // using getProductByName middleware
    } else {
      getProductsByCategory(req, res, next); // using getProductsByCategory middleware
    }
  } catch (error) {
    res.status(500).json({ msg: "Error creating product", error });
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
    }
  } catch (error) {
    res.status(500).json({ msg: "Error finding product", error });
  }
};

export { addProduct, getProducts, getProduct, getProductByName };
