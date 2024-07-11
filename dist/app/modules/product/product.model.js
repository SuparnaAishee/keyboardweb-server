"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
//defining schema
const VariantDataSchema = new mongoose_1.Schema({
    type: { type: String, required: [true, 'Type is required'] },
    value: { type: String, required: [true, 'Value is required'] },
}, { _id: false });
const InventoryDataSchema = new mongoose_1.Schema({
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    inStock: { type: Boolean, required: true },
}, { _id: false });
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    category: { type: String, required: [true, 'Category is required'] },
    tags: { type: [String], required: true },
    variants: { type: [VariantDataSchema], required: true },
    inventory: { type: InventoryDataSchema, required: true },
}, { versionKey: false });
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
