"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_model_1 = require("./product.model");
const product_validation_1 = require("./product.validation");
//<---controller for create product start--->
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        // Validate productData using Zod schema
        const zodProductData = product_validation_1.ProductValidationSchema.parse(productData);
        const existingProduct = yield product_model_1.Product.findOne({
            name: zodProductData.name,
        });
        if (existingProduct) {
            return res.status(400).json({ error: 'Product already exists' });
        }
        else {
            // Create the product
            const newProduct = new product_model_1.Product(zodProductData);
            const createdProduct = yield newProduct.save();
            return res.status(200).json({
                success: true,
                message: 'Product created successfully!',
                data: createdProduct,
            });
        }
    }
    catch (error) {
        if (error.name === 'ZodError') {
            const errorMessage = error.errors
                .map((err) => err.message)
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
});
//<---controller for create product end--->
//<---controller for get single product start--->
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: err,
        });
    }
});
//<---controller for get single product end--->
//<---controller for update product start--->
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const productData = req.body;
        const updateResult = yield product_service_1.ProductServices.updateProductToDB(productId, productData);
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
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error.message || error,
        });
    }
});
//<---controller for update product end--->
//<---controller for delete product start--->
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'product is deleted sucessfully',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: err,
        });
    }
});
//<---controller for delete product end--->
//<---controller for get all product or serachTerm product start--->
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const products = searchTerm
            ? yield product_service_1.ProductListService.getProductsBySearchTerm(searchTerm)
            : yield product_service_1.ProductListService.getAllProducts();
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: products,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: err.message,
        });
    }
});
//<---controller for get all product or serachTerm product end--->
exports.ProductControllers = {
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getProducts,
};
