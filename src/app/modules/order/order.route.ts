import express from 'express';

import { OrderController } from './order.controller';

const router = express.Router();

router.post('/', OrderController.cerateOrder);
router.get('/', OrderController.getOrders);

export const OrderRoutes = router;
