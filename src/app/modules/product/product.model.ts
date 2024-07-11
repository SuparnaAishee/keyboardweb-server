import { Schema, model } from 'mongoose';
import { TInventoryData, TProduct, TVariantData } from './product.interface';

//defining schema

const VariantDataSchema = new Schema<TVariantData>(
  {
    type: { type: String, required: [true, 'Type is required'] },
    value: { type: String, required: [true, 'Value is required'] },
  },
  { _id: false },
);
const InventoryDataSchema = new Schema<TInventoryData>(
  {
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    inStock: { type: Boolean, required: true },
  },
  { _id: false },
);

const ProductSchema = new Schema<TProduct, TInventoryData, TVariantData>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    category: { type: String, required: [true, 'Category is required'] },
    tags: { type: [String], required: true },
    variants: { type: [VariantDataSchema], required: true },
    inventory: { type: InventoryDataSchema, required: true },
  },
  { versionKey: false },
);

export const Product = model<TProduct>('Product', ProductSchema);
