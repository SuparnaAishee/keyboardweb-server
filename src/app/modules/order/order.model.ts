import { Schema, model } from 'mongoose';
import { TOrder } from './order.iterface';

const orderSchema = new Schema<TOrder>(
  {
    email: { type: String, required: true },

    productId: { type: String, required: true },

    price: { type: Number, required: true },

    quantity: { type: Number, required: true },
  },
  { versionKey: false },
);

export const Order = model<TOrder>('Order', orderSchema);
