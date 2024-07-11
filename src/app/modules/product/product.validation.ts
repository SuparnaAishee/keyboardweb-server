import { z } from 'zod';

//defining zod schema
const VariantValidationSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  value: z.string().min(1, 'Value is required'),
});

const InventoryValidationSchema = z.object({
  quantity: z.number().min(0, 'Quantity must be a positive number'),
  inStock: z.boolean(),
});

const ProductValidationSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().positive('Price must be a positive number'),
    category: z.string().min(1, 'Category is required'),
    tags: z.array(z.string()).min(1, 'Tags are required'),
    variants: z.array(VariantValidationSchema).min(1, 'Variants are required'),
    inventory: InventoryValidationSchema,
  })
  .refine((value) => {
    const { name, description, price, category, tags, variants, inventory } =
      value;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !tags ||
      !variants ||
      !inventory
    ) {
      throw new Error(
        'Name, Description, Price, Category, Tags, Variants, and Inventory are required',
      );
    }
    return true;
  });

export {
  ProductValidationSchema,
  VariantValidationSchema,
  InventoryValidationSchema,
};
