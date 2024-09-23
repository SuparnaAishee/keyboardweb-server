// export type TOrder = {
//   email: string;

//   quantity: number;
//   productId: string;
//   mobileno?: number;
//   address: string;
//   price?: number;
// };

export type TOrder = {
  email: string;
  products: { productId: string; quantity: number }[]; // Changed to an array of products
  mobileno?: number;
  address: string;
  price?: number; // You may want to calculate total price instead of keeping this
  quantity?:number;
};
