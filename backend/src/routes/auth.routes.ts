import express from 'express';
import { authDelete, authUpdate, login, logout, signup } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/update/:id", authUpdate);
router.delete("/delete/:id", authDelete);
router.post("/logout", logout);

export default router;