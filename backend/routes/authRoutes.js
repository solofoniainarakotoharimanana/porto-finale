import express from "express";
import { getMe, signIn, signUp } from "../controllers/authController.js";
import {protectRoute} from "../middleware/protectRoute.js"

const router = express.Router();

router.post('/register' , signUp)
router.post('/login', signIn)
router.get("/me", protectRoute, getMe)

export default router;