// Order Model (User, Products, Total Price, Payment Status)

import mongoose, { Schema } from "mongoose";

interface IOrder {
  userId: object;
  products: object;
  totalPrice: number;
  paymentStatus: string;
}

const orderSchema = new Schema<IOrder>({
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
    },
  ],
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
});

export default mongoose.model("Order", orderSchema);
