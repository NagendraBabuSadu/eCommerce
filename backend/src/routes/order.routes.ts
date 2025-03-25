import express from 'express';
import { addOrder } from '../controllers/order.controller.js';
import isUser from '../middlewares/isUser.js';



const router = express.Router();

router.post('/', isUser, addOrder);

export default router;