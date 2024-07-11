import { Request, Response } from 'express';
import { OrderListServices, OrderServices } from './order.service';


import OrderValidateSchema from './order.validation';
import { ProductServices } from '../product/product.service';

import { TOrder} from './order.iterface';


//<---create controller for ordering product start--->
export const cerateOrder = async (req: Request, res: Response) => {
  try {
    const reqOrderData: TOrder = req.body;
    const zodOrderData = OrderValidateSchema.parse(reqOrderData);

    const id = zodOrderData.productId;

    // check if the product exists
    const product = await ProductServices.getSingleProductFromDB(id);
    if (!product) {
      const error = new Error();
      error.name = 'not-found';
      error.message = 'The product does not exist!';
      throw error;
    }

    // check if the product is in stock
    if (product.inventory.inStock === false) {
      const error = new Error();
      error.message = 'Insufficient quantity!';
      throw error;
    }

    if (zodOrderData.quantity > product.inventory.quantity) {
      const error = new Error();
      error.message = `Insufficient quantity ! Only ${product.inventory.quantity} products are available.`;
      throw error;
    }

    

    const order = await OrderServices.createOrderFromDB(zodOrderData);

    // update product inventory after create an order
    product.inventory = {
      quantity: product.inventory.quantity - zodOrderData.quantity,
      inStock:
        product.inventory.quantity > zodOrderData.quantity ? true : false,
    };
    await ProductServices.updateProductToDB(id, product);

    res.send({
      success: true,
      message: 'Order created successfully!',
      data: order,
    });
  } catch (err: any) {
    res.status(500).json({
      sucess: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
//<---creating controller order product end--->

// <---creating controller for getting orders, either all or by email start--->
const getOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;

    const orders = email
      ? await OrderListServices.getOrdersByEmail(email)
      : await OrderListServices.getAllOrders();

    //checking if the search mail had any order ot not
    if (orders.length === 0) {
      const err = email
        ? `No orders found for the provided ${email}`
        : 'No orders found';
      throw new Error(err);
    }
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: orders,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error.message,
    });
  }
};
// <---creating controller for getting orders, either all or by email end--->
export const OrderController = {
  cerateOrder,
  getOrders,
};
