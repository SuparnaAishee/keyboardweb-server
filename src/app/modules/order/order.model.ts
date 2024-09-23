

// const orderSchema = new Schema<TOrder>(
//   {
//     email: { type: String, required: true },
//     address: { type: String, required: true },
//     productId: { type: String, required: true },

//     price: { type: Number },
//     mobileno: { type: Number},
//     quantity: { type: Number, required: true },
//   },
//   { versionKey: false },
// );

// export const Order = model<TOrder>('Order', orderSchema);
// order.model.ts

import { Schema, model } from 'mongoose';
import { TOrder } from './order.iterface';


const orderSchema = new Schema<TOrder>(
  {
    email: { type: String, required: true },
    address: { type: String, required: true },
    products: [{ // Array of products
      productId: { type: Schema.Types.ObjectId, required: true },
      quantity: { type: Number, required: true },
    }],
    mobileno: { type: Number },
    price: { type: Number },

  },
  { versionKey: false }
);

export const Order = model<TOrder>('Order', orderSchema);
