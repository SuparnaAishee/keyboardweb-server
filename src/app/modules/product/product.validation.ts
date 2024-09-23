import { z } from 'zod';

// Defining Zod schema for variants
const VariantValidationSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  value: z.string().min(1, 'Value is required'),
});

// Defining Zod schema for inventory
const InventoryValidationSchema = z.object({
  quantity: z.number().min(0, 'Quantity must be a positive number'),
  inStock: z.boolean(),
});

// Defining Zod schema for products
const ProductValidationSchema = z.object({
  image: z.string().min(1, 'Image is required'), // Made required
  name: z.string().min(1, 'Name is required'),
  brand: z.string().optional(), // Made optional
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be a positive number'),
  ratings: z
    .number()
    .nonnegative('Ratings must be a non-negative number')
    .optional(), // Allowing zero ratings as valid input
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(), // Made optional
  variants: z.array(VariantValidationSchema).optional(), // Made optional
  inventory: InventoryValidationSchema.optional(), // Made optional
});

// Exporting the ProductValidationSchema, VariantValidationSchema, and InventoryValidationSchema
export {
  ProductValidationSchema,
  VariantValidationSchema,
  InventoryValidationSchema,
};
