// Cart Model (User, Products, Quantity)

import mongoose, { Schema } from "mongoose";
import { string } from "zod";

interface ICart {
  products: object;
  quantity: number;
  userId: object;
  productName: string;
  price: number;
}

const cartSchema = new Schema<ICart>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

export default mongoose.model("Cart", cartSchema);
