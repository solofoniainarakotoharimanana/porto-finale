import express from "express";
import { protectRoute } from "../middleware/protectRoute.js"
import {
    getRequestViaProject,
    validRequest
} from "../controllers/requestController.js";

const router = express.Router();

router.post('/valid-request/:projectId', protectRoute, validRequest);
router.get('/get-request-project/:projectId', protectRoute, getRequestViaProject);

export default router;