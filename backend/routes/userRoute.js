import express from "express"
import {
    createProject,
    followUnfollowCompany,
    getProjectById,
    getProjectsByUser,
    sendRequestForRealization,
    likeProject,
    getCompanies
} from "../controllers/userController.js";
import { getMe } from "../controllers/authController.js";

import {protectRoute} from "../middleware/protectRoute.js"

const router = express.Router();

router.get('/my-projects', protectRoute, getProjectsByUser)
router.get('/project-detail/:projectId', protectRoute, getProjectById)
router.post('/create-project', protectRoute, createProject)
router.post('/like-project/:projectId', protectRoute, likeProject)
router.post('/follow-company/:companyId', protectRoute, followUnfollowCompany)
router.get('/get-company', protectRoute, getCompanies)

router.post('/request-realization/:projectId', protectRoute, sendRequestForRealization);
router.get('/me', protectRoute, getMe)
export default router;