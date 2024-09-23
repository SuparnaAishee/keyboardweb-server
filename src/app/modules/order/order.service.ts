// import { Product } from '../product/product.model';

// import { Order } from './order.model';
// import { TOrder } from './order.iterface';

// const createOrderFromDB = async (orderData: TOrder) => {
//   try {
//     const { email, productId, quantity, mobileno, address, price } = orderData;

//     // Validate required fields
//     if (!email || !productId || quantity === undefined || !address) {
//       throw new Error('Invalid input: Missing required fields');
//     }

//     const product = await Product.findById(productId);
//     if (!product) {
//       throw new Error('Product not found');
//     }

//     const order = await Order.create({
//       email,
//       productId: product._id.toString(),
//       name,
//       price: price !== undefined ? price : product.price,
//       quantity,
//       mobileno: mobileno !== undefined ? mobileno : null,
//       address,
//     });

//     return order;
//   } catch (error) {
//     throw new Error('Error in creating order ');
//   }
// };

// export const OrderListServices = {
//   getAllOrders: async () => {
//     try {
//       return await Order.find({});
//     } catch (error) {
//       throw new Error('Error fetching all orders from database');
//     }
//   },

//   getOrdersByEmail: async (email: string) => {
//     try {
//       return await Order.find({ email });
//     } catch (error) {
//       throw new Error('Error fetching orders from database');
//     }
//   },
// };

// export const OrderServices = {
//   createOrderFromDB,
// };


// order.service.ts

import { Product } from '../product/product.model';
import { TOrder } from './order.iterface';
import { Order } from './order.model';


// const createOrderFromDB = async (orderData: TOrder) => {
//   try {
//     const { email, products, mobileno, address } = orderData;

//     // Validate required fields
//     if (!email || !products || products.length === 0 || !address) {
//       throw new Error('Invalid input: Missing required fields');
//     }

//     const order = await Order.create({
//       email,
//       products,
//       mobileno: mobileno !== undefined ? mobileno : null,
//       address,
//       price: undefined, // Price should be calculated after creating order
//     });

//     return order;
//   } catch (error) {
//     throw new Error('Error in creating order');
//   }
// };
const createOrderFromDB = async (orderData: TOrder) => {
  try {
    const { email, products, mobileno, address } = orderData;

    // Validate required fields
    if (!email || !products || products.length === 0 || !address) {
      throw new Error('Invalid input: Missing required fields');
    }

    // Start a transaction to update product quantities and create the order
    const session = await Order.startSession();
    session.startTransaction();

    try {
      // Decrement product quantities
      for (const item of products) {
        const product = await Product.findById(item.productId);

        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        // Access quantity from inventory
        const { inventory } = product;
        if (!inventory || inventory.quantity < item.quantity) {
          throw new Error(`Not enough stock for product: ${product.name}`);
        }

        // Reduce quantity
        inventory.quantity -= item.quantity;

        // If quantity reaches 0, mark as out of stock
        if (inventory.quantity === 0) {
          inventory.inStock = false;
        }

        // Save the updated product inventory
        await product.save({ session });
      }

      // Create the order
      const order = await Order.create(
        [
          {
            email,
            products,
            mobileno: mobileno !== undefined ? mobileno : null,
            address,
            price: undefined, // Price should be calculated after creating order
          },
        ],
        { session },
      );

      await session.commitTransaction();
      session.endSession();

      return order;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    throw new Error('Error in creating order');
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
