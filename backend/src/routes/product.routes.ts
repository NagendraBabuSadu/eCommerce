import express from 'express';
import {addProduct, getProduct,  getProducts}  from '../controllers/product.controller.js';
import isAdmin from '../middlewares/isAdmin.js';

const router = express.Router();

router.post("/", isAdmin, addProduct);
router.get("/", getProducts);
router.get("/products/:id", isAdmin,  getProduct);

export default router;