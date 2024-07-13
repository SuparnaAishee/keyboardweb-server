
import { Product } from '../product/product.model';

import { Order } from './order.model';
import { TOrder } from './order.iterface';



const createOrderFromDB = async (orderData: TOrder) => {
  try {
    const { email, productId, quantity, mobileno, address, price } = orderData;

    // Validate required fields
    if (!email || !productId || quantity === undefined || !address) {
      throw new Error('Invalid input: Missing required fields');
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

 
    const order = await Order.create({
      email,
      productId: product._id.toString(),
      name,
      price: price !== undefined ? price : product.price, 
      quantity,
      mobileno: mobileno !== undefined ? mobileno : null, 
      address,
    });

    return order;
  } catch (error) {
    throw new Error('Error in creating order ');
  }
};

export const OrderListServices = {
  getAllOrders: async () => {
    try {
      return await Order.find({});
    } catch (error) {
      throw new Error('Error fetching all orders from database');
    }
  },

  getOrdersByEmail: async (email: string) => {
    try {
      return await Order.find({ email });
    } catch (error) {
      throw new Error('Error fetching orders from database');
    }
  },
};

export const OrderServices = {
  createOrderFromDB,
};
