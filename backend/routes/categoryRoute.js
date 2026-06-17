import express from "express";
import { fetchCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.get('/all', fetchCategories)

export default router;