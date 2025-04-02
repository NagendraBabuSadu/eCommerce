//	• Product Model (Name, Price, Description, Images, Category

import mongoose, { Schema } from 'mongoose';

interface IProduct {
  productName: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const productSchema = new Schema<IProduct>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },    
    description: { type: String, required: true },
    category: { type: String, required: false },
    image: {type: String}
})

export default mongoose.model('Product', productSchema);