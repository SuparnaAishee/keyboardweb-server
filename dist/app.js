"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./app/modules/product/product.route");
const order_route_1 = require("./app/modules/order/order.route");
const handle_error_1 = require("./app/middlewares/handle.error");
const app = (0, express_1.default)();
//parser for json
app.use(express_1.default.json());
app.use('/api/products', product_route_1.ProductRoutes);
app.use('/api/orders', order_route_1.OrderRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
//from middleware 
app.use(handle_error_1.notFoundHandler);
exports.default = app;
