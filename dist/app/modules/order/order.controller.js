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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = exports.cerateOrder = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = __importDefault(require("./order.validation"));
const product_service_1 = require("../product/product.service");
//<---create controller for ordering product start--->
const cerateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqOrderData = req.body;
        const zodOrderData = order_validation_1.default.parse(reqOrderData);
        const id = zodOrderData.productId;
        // check if the product exists
        const product = yield product_service_1.ProductServices.getSingleProductFromDB(id);
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
        const order = yield order_service_1.OrderServices.createOrderFromDB(zodOrderData);
        // update product inventory after create an order
        product.inventory = {
            quantity: product.inventory.quantity - zodOrderData.quantity,
            inStock: product.inventory.quantity > zodOrderData.quantity ? true : false,
        };
        yield product_service_1.ProductServices.updateProductToDB(id, product);
        res.send({
            success: true,
            message: 'Order created successfully!',
            data: order,
        });
    }
    catch (err) {
        res.status(500).json({
            sucess: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
exports.cerateOrder = cerateOrder;
//<---creating controller order product end--->
// <---creating controller for getting orders, either all or by email start--->
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const orders = email
            ? yield order_service_1.OrderListServices.getOrdersByEmail(email)
            : yield order_service_1.OrderListServices.getAllOrders();
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error.message,
        });
    }
});
// <---creating controller for getting orders, either all or by email end--->
exports.OrderController = {
    cerateOrder: exports.cerateOrder,
    getOrders,
};
