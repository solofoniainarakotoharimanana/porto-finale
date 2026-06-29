import { generateToken } from "../lib/generateToken.js";
import User from "./../models/userModel.js"

import bcrypt from "bcryptjs"

export const signUp = async (req, res) => {
    try {
        const { username, firstname, lastname, email, password, role } = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({error: "Invalid email format."})
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({error: "Email already taken."})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role
        });

        const { password: pass, ...rest } = newUser._doc;
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save()
            res.status(201).json({
                message:  "User created successfully",
                user: rest
            })
        } else {
            res.status(500).json({error: "Invalid user datas"})
        }
        

    } catch (error) {
        res.status(500).json({error: "internal server error"})
    }
}

export const getMe = async (req, res) => {
    try {
        
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            res.status(500).json({error: "User not found"})
        }

        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(422).json({
                success: false,
                message: "All fields required!"
            })
        }

        const user = await User.findOne({ email });
       
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials!"
            })
        }
        const passwordHashed = await bcrypt.compare(password, user.password);
        
        if (!passwordHashed) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials!"
            })
        }
        const token = generateToken(user._id, res);
        const { password: pass, ...rest } = user._doc;

        res.status(200).json({
            message: "User logged in successfully",
            user: rest,
            token
        })
    }
    catch (error) {
         res.status(500).json({error: "internal server error"})
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 })
        res.status(200).json({
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log("Error on logout controller ", error.message);
        res.status(500).json({
            error: "Internal server error"
        })
    }
}