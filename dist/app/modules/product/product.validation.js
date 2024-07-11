"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryValidationSchema = exports.VariantValidationSchema = exports.ProductValidationSchema = void 0;
const zod_1 = require("zod");
//defining zod schema
const VariantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, 'Type is required'),
    value: zod_1.z.string().min(1, 'Value is required'),
});
exports.VariantValidationSchema = VariantValidationSchema;
const InventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0, 'Quantity must be a positive number'),
    inStock: zod_1.z.boolean(),
});
exports.InventoryValidationSchema = InventoryValidationSchema;
const ProductValidationSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1, 'Name is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    price: zod_1.z.number().positive('Price must be a positive number'),
    category: zod_1.z.string().min(1, 'Category is required'),
    tags: zod_1.z.array(zod_1.z.string()).min(1, 'Tags are required'),
    variants: zod_1.z.array(VariantValidationSchema).min(1, 'Variants are required'),
    inventory: InventoryValidationSchema,
})
    .refine((value) => {
    const { name, description, price, category, tags, variants, inventory } = value;
    if (!name ||
        !description ||
        !price ||
        !category ||
        !tags ||
        !variants ||
        !inventory) {
        throw new Error('Name, Description, Price, Category, Tags, Variants, and Inventory are required');
    }
    return true;
});
exports.ProductValidationSchema = ProductValidationSchema;
