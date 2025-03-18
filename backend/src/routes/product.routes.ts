import express from 'express';
import addProduct  from '../controllers/product.controller.js';
import isAdmin from '../middlewares/isAdmin.js';

const router = express.Router();

router.post("/add", isAdmin, addProduct);

export default router;