import express from "express"
import User from "../models/userModel.js";
import Project from "../models/projectModel.js"

import Category from "../models/categoryModel.js";
import RequestRealization from "../models/requestForRealization.js"

export const getProjectsByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const pageNumber = +req.query.pageNumber || 1;
        const pageSize = process.env.PAGINATION_LIMIT;

        // console.log("USER ID >>> ", userId)
        const userConnected = await User.findById(userId);
        if (!userConnected) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized user"
            })
        }

        const query = { owner: userConnected._id };
        const projectByUserConnected = await Project.find(query)
            .populate("category", "title")
            .populate("owner", "username firstname lastname");
        console.log(projectByUserConnected)
        
        const count = await Project.countDocuments(query);
            
        return res.status(200).json({
            success: true,
            message: "Projects of the user connected",
            projects: projectByUserConnected,
            pageNumber,
            pages: Math.ceil(count/pageSize)
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const followUnfollowCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        const user = await User.findById(req.user._id);
        
        const company = await User.findByIdAndUpdate(companyId);
        

        if (companyId.toString() === req.user._id.toString()) {
            res.status(400).json({
                success: false,
                message: "You can't follow/unfollow your self"
            })
        }

        if (!user || !company) {
            res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        const isFollowers = company.followers.includes(user._id);
        console.log(isFollowers)
        if (isFollowers) {
            await User.findByIdAndUpdate(companyId, {
                $pull: {followers: user._id}
            })
            await User.findByIdAndUpdate(user._id, {
                $pull: {followings: companyId}
            })
        }
        else {
            await User.findByIdAndUpdate(companyId, {
                $push: {followers: user._id}
            })

            await User.findByIdAndUpdate(user._id, {
                $push: {followings: companyId}
            })
        }

        res.status(200).json({
            success: true,
            message: "User followed successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const sendRequestForRealization = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description, completionTime, company} = req.body;
        const project = await Project.findById(projectId);
        const owner = await User.findById(req.user._id);
        if (!project) {
            return res.status(500).json({
                success: false,
                message: "Project not found"
            })
        }
        if (!owner) {
             return res.status(500).json({
                success: false,
                message: "User not found"
            })
        }

        const request = new RequestRealization({
            title, 
            description,
            completionTime,
            company,
            project: project._id,
            owner: owner._id
        })

        await request.save();
        res.status(200).json({
            success: true,
            message: "Request sended successfully",
            request
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const createProject = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const owner = await User.findById(req.user._id);
        
        if (!owner) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const newProject = new Project({
            title,
            description,
            category,
            owner,
        })

        await newProject.save();
        
        res.status(201).json({
            success: true,
            message: "Project created successfully",
            newProject
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getProjectById = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const projectId = req.params.projectId;
        const project = await Project.findById(projectId)
        .populate("category", "title");
        if (!project) {
            return res.status(400).json({
                error: "Project not found"
            })
        }

        res.status(200).json({
            project
        })

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const likeProject = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const projectId = req.params.projectId;
        const project = await Project.findById(projectId)

        if (!user) {
            return res.status(400).json({
                error: "User not found"
            })
        }

        if (!project) {
            return res.status(400).json({
                error: "Project not found"
            })
        }

        const isLiked = project.likes.includes(user._id);
        // console.log("IS LIKED >>> ", isLiked)
        if (!isLiked) {
            
            await Project.findByIdAndUpdate(projectId, {
                $push: {likes: user._id}
            })
            await User.findByIdAndUpdate(user._id, {
                $push: {likedProject: projectId}
            })
        } else {
            await Project.findByIdAndUpdate(projectId, {
                $pull: {likes: user._id}
            })
            await User.findByIdAndUpdate(user._id, {
                $pull: {likedProject: projectId}
            })
        }
        
        res.status(200).json({
            message: "User liked project successfully.",
            project,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const getCompanies = async (req, res) => {
    try {
        const companies = await User.find({ role: "company" })
        
        res.status(200).json({
            companies
        })
        
    } catch (error) {
         return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}