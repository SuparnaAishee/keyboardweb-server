"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const z = __importStar(require("zod"));
// Define a Zod validation schema 
const OrderValidateSchema = z.object({
    email: z
        .string()
        .email()
        .min(1, 'Invalid email format')
        .refine((value) => value !== undefined, {
        message: 'Email is required',
        path: ['email'],
    }),
    productId: z
        .string()
        .min(1, 'Product ID is required')
        .refine((value) => value !== undefined, {
        message: 'Product ID is required',
        path: ['productId'],
    }),
    name: z.string().optional(),
    price: z
        .number()
        .positive()
        .min(1, 'Price must be a positive number')
        .refine((value) => value !== undefined, {
        message: 'Price is required',
        path: ['price'],
    }),
    quantity: z
        .number()
        .int()
        .positive()
        .min(1, 'Quantity must be a positive integer')
        .refine((value) => value !== undefined, {
        message: 'Quantity is required',
        path: ['quantity'],
    }),
});
exports.default = OrderValidateSchema;
