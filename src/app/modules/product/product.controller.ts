import { Request, Response } from 'express';
import { ProductListService, ProductServices } from './product.service';
import { Product } from './product.model';
import { ProductValidationSchema } from './product.validation';




//<---controller for create product start--->
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // Validate productData using Zod schema
    const zodProductData = ProductValidationSchema.parse(productData);

    const existingProduct = await Product.findOne({
      name: zodProductData.name,
    });

    if (existingProduct) {
      return res.status(400).json({ error: 'Product already exists' });
    } else {
      // Create the product
      const newProduct = new Product(zodProductData);
      const createdProduct = await newProduct.save();

      return res.status(200).json({
        success: true,
        message: 'Product created successfully!',
        data: createdProduct,
      });
    }
  } catch (error:any) {
   
    if (error.name === 'ZodError') {
      const errorMessage = error.errors
        .map((err: any) => err.message)
        .join(', ');
      return res.status(400).json({ error: errorMessage });
    }

    res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong',
        error: error.message,
      });
  }
};
//<---controller for create product end--->

//<---controller for get single product start--->
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params; 
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};
//<---controller for get single product end--->

//<---controller for update product start--->
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;

    const updateResult = await ProductServices.updateProductToDB(
      productId,
      productData,
    );
    console.log('Update result:', updateResult);
    if (!updateResult) {
      res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: updateResult,
    });
  } catch (error:any) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error.message || error,
    });
  }
};
//<---controller for update product end--->

//<---controller for delete product start--->
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'product is deleted sucessfully',
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

//<---controller for delete product end--->

//<---controller for get all product or serachTerm product start--->

const getProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const products = searchTerm
      ? await ProductListService.getProductsBySearchTerm(searchTerm)
      : await ProductListService.getAllProducts();

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: products,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err.message,
    });
  }
};

//<---controller for get all product or serachTerm product end--->

export const ProductControllers = {
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};
