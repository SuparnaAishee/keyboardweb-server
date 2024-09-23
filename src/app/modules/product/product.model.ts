import { Schema, model } from 'mongoose';
import { TInventoryData, TProduct, TVariantData } from './product.interface';

// Defining schema for variants
const VariantDataSchema = new Schema<TVariantData>(
  {
    type: { type: String },
    value: { type: String },
  },
  { _id: false },
);

// Defining schema for inventory
const InventoryDataSchema = new Schema<TInventoryData>(
  {
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    inStock: { type: Boolean, required: true },
  },
  { _id: false },
);

// Defining Product schema
const ProductSchema = new Schema<TProduct>(
  {
    image: { type: String, required: [true, 'Image is required'] },
    name: { type: String, required: [true, 'Name is required'] },
    brand: { type: String }, // Optional field
    description: { type: String, required: [true, 'Description is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    ratings: { type: Number }, // Optional field
    category: { type: String, required: [true, 'Category is required'] },
    tags: { type: [String] }, // Optional field
    variants: { type: [VariantDataSchema] }, // Optional field
    inventory: { type: InventoryDataSchema }, // Optional field
  },
  { versionKey: false },
);

// Exporting the Product model
export const Product = model<TProduct>('Product', ProductSchema);
