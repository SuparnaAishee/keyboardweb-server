import express from 'express';

import { ProductControllers } from './product.controller';
import { ProductServices } from './product.service';

const router = express.Router();
//creating routes
router.post('/', ProductControllers.createProduct);

router.get('/', ProductControllers.getProducts);
router.get('/latest',ProductControllers.getLatestProducts);
router.get('/:productId', ProductControllers.getSingleProduct);

router.put('/:productId', ProductControllers.updateProduct);

router.delete('/:ProductId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
