"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
//error handdler
const notFoundHandler = (req, res, next) => {
    const error = new Error();
    error.name = 'not-found';
    error.message = 'Route not found!';
    next(error);
};
exports.notFoundHandler = notFoundHandler;
