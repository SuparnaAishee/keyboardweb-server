
import { TProduct } from './product.interface';
import { Product } from './product.model';

//creating product services
const createProductFromDB = async (productData: TProduct) => {
  const result = await Product.create(productData);

  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

const updateProductToDB = async (
  productId: string,
  productData: Partial<TProduct>,
) => {
  try {
    const updateResult = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: productData },
      { new: true, runValidators: true },
    );

    return updateResult;
  } catch (err) {
    console.error('Error updating product in DB:', err);
    throw err;
  }
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

export const ProductListService = {
  getAllProducts: async () => {
    try {
      return await Product.find({});
    } catch (error) {
      throw new Error('Error fetching all products from database');
    }
  },

  getProductsBySearchTerm: async (searchTerm: string) => {
    try {
      const regex = new RegExp(searchTerm, 'i'); 
      return await Product.find({ name: { $regex: regex } });
    } catch (error) {
      throw new Error('Error fetching products by search term from database');
    }
  },
};

export const ProductServices = {
  createProductFromDB,

  getSingleProductFromDB,
  updateProductToDB,
  deleteProductFromDB,
};
