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
exports.OrderServices = exports.OrderListServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrderFromDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, productId, quantity } = orderData;
        const product = yield product_model_1.Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        const order = yield order_model_1.Order.create({
            email,
            productId: product._id.toString(),
            name: product.name,
            price: product.price,
            quantity,
        });
        return order;
    }
    catch (error) {
        throw new Error('Error in creating order ');
    }
});
exports.OrderListServices = {
    getAllOrders: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield order_model_1.Order.find({});
        }
        catch (error) {
            throw new Error('Error fetching all orders from database');
        }
    }),
    getOrdersByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield order_model_1.Order.find({ email });
        }
        catch (error) {
            throw new Error('Error fetching orders from database');
        }
    }),
};
exports.OrderServices = {
    createOrderFromDB,
};
