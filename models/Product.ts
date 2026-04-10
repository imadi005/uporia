import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: String,
    imageUrl: String,
  },
  { timestamps: true }
);

const Product = models.Product || model('Product', ProductSchema);

export default Product;
