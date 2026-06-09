import express from "express"
import {
    createProject,
    followUnfollowCompany,
    getProjectsByUser,
    sendRequestForRealization
} from "../controllers/userController.js";
import { getMe } from "../controllers/authController.js";

import {protectRoute} from "../middleware/protectRoute.js"


const router = express.Router();

router.get('/my-projects', protectRoute, getProjectsByUser)
router.post('/create-project', protectRoute, createProject)
router.post('/follow-company/:companyId', protectRoute, followUnfollowCompany)

router.post('/request-realization/:projectId', protectRoute, sendRequestForRealization);
router.get('/me', protectRoute, getMe)
export default router;