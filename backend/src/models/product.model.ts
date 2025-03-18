//	• Product Model (Name, Price, Description, Images, Category

import mongoose, { Schema } from 'mongoose';

interface IProduct {
  name: string;
  price: number;
  description: string;
  category: string;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: Number, required: true },    
    description: { type: String, required: true },
    category: { type: String, required: false },
})

export default mongoose.model('Product', productSchema);