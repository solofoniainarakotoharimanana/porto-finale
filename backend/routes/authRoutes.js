import express from "express";
import { getMe, signIn, signUp, logout } from "../controllers/authController.js";
import {protectRoute} from "../middleware/protectRoute.js"

const router = express.Router();

router.post('/register' , signUp)
router.post('/login', signIn)
router.post('/logout', logout)
router.get("/me", protectRoute, getMe)

export default router;