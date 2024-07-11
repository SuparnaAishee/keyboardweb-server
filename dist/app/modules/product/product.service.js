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
exports.ProductServices = exports.ProductListService = void 0;
const product_model_1 = require("./product.model");
//creating product services
const createProductFromDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(productData);
    return result;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ _id: id });
    return result;
});
const updateProductToDB = (productId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateResult = yield product_model_1.Product.findOneAndUpdate({ _id: productId }, { $set: productData }, { new: true, runValidators: true });
        return updateResult;
    }
    catch (err) {
        console.error('Error updating product in DB:', err);
        throw err;
    }
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.deleteOne({ _id: id });
    return result;
});
exports.ProductListService = {
    getAllProducts: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield product_model_1.Product.find({});
        }
        catch (error) {
            throw new Error('Error fetching all products from database');
        }
    }),
    getProductsBySearchTerm: (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const regex = new RegExp(searchTerm, 'i');
            return yield product_model_1.Product.find({ name: { $regex: regex } });
        }
        catch (error) {
            throw new Error('Error fetching products by search term from database');
        }
    }),
};
exports.ProductServices = {
    createProductFromDB,
    getSingleProductFromDB,
    updateProductToDB,
    deleteProductFromDB,
};
