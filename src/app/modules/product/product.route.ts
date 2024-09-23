import express from 'express';

import { ProductControllers } from './product.controller';


const router = express.Router();
//creating routes
router.post('/', ProductControllers.createProduct);

router.get('/', ProductControllers.getProducts);
router.get('/latest',ProductControllers.getLatestProducts);
router.get('/:productId', ProductControllers.getSingleProduct);

router.put('/:productId', ProductControllers.updateProduct);

router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
