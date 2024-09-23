// import * as z from 'zod';

// // Define a Zod validation schema
// const OrderValidateSchema = z.object({
//   email: z
//     .string()
//     .email()
//     .min(1, 'Invalid email format')
//     .refine((value) => value !== undefined, {
//       message: 'Email is required',
//       path: ['email'],
//     }),
//   address: z.string(),
//   productId: z
//     .string()
//     .min(1, 'Product ID is required')
//     .refine((value) => value !== undefined, {
//       message: 'Product ID is required',
//       path: ['productId'],
//     }),
//   name: z.string().optional(),
//   price: z
//     .number()
//     .positive()
//     .min(1, 'Price must be a positive number')
//     .optional(),
//   // .refine((value) => value !== undefined, {
//   //   message: 'Price is required',
//   //   path: ['price'],
//   // }),
//   mobileno: z.number().optional(),
//   quantity: z
//     .number()
//     .int()
//     .positive()
//     .min(1, 'Quantity must be a positive integer')
//     .refine((value) => value !== undefined, {
//       message: 'Quantity is required',
//       path: ['quantity'],
//     }),
// });

// export default OrderValidateSchema;


// Order validation schema example
import { z } from 'zod';

const OrderValidateSchema = z.object({
  email: z.string().email(),
  products: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1), // Ensure quantity is at least 1
    })
  ),
  mobileno: z.number().optional(),
  address: z.string(),
  price: z.number().optional(),
});

export default OrderValidateSchema;
