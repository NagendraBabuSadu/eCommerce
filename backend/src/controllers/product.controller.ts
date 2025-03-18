import { Request, Response, NextFunction } from "express";
import productModel from "../models/product.model.js";
import { createProduct } from "../validators/product.validator.js";

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createPayload = req.body;
    const parsedPayload = createProduct.safeParse(createPayload);
    if (!parsedPayload.success) {
      res.status(400).json({ msg: "You sent wrong input" });
      return;
    }

    const newProduct = await productModel.create({
        name: createPayload.name,
        price: createPayload.price,
        description: createPayload.description,
        category: createPayload.category,
    });

    
    await newProduct.save();
    res.status(200).json({ msg: "Product created", product: newProduct });
  } catch (error) {
    res.status(500).json({ msg: "Error creating product", error });
  }
};

export default addProduct;