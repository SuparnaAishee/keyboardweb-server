import { Error } from "mongoose";


export type TOrder = {
  email: string;

  quantity: number;
  productId: string;

  price: number;
};


