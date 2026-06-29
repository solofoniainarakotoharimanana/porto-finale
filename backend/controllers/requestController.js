
import { sendEmail } from "../lib/sendEmail.js";
import Project from "../models/projectModel.js";
import RequestRealization from "../models/requestForRealization.js";
import User from "../models/userModel.js";
import { parse } from 'date-fns';
import { response } from "express";

export const validRequest = async (req, res) => {
    try {
        const { title, description, company, completionTime, startDate, project } = req.body;
        
        const owner = await User.findById(req.user._id)
        const chosenCompany = await User.findById(company);
        const projectRequested = await Project.findById(project)
        const startDateConverted = new Date(startDate);

        if (!projectRequested) {
            return res.status(400).json({
                message: "Project not found"
            })
        }
        if (!chosenCompany) {
            return res.status(400).json({
                message: "Company not found"
            })
        }
        if (!owner) {
            return res.status(400).json({
                message: "Owner project not found"
            })
        }
        const request = new RequestRealization({
            title, 
            description,
            company: chosenCompany,
            owner,
            startDate: startDateConverted,
            completionTime,
            project: projectRequested
            
        });
       
        await request.save();

        sendEmail("1formartic@gmail.com", "solofoniainarakotoharimanana@gmail.com");
        // sendEmail(owner.email, company.email);
        res.status(201).json({
            message: "Request created successfully",
            request
        })
        
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getRequestViaProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const request = await RequestRealization.findOne({ project: projectId });
        res.status(200).json({
            request
        })
        
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
} 

