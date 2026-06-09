import React from 'react'

import { validateEmail } from "../../utils/Helper.js"

import { motion } from "framer-motion"

import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Loader,
    AlertCircle,
    CheckCircle
} from "lucide-react"
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/store.js'
import { toast } from "react-hot-toast"
import API from '../../utils/api.js';

const Login = () => {
    const navigate = useNavigate()
    const { loginUser, token, isAuthenticated } = useAuthStore(state => state)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false
    })

    const [formState, setFormState] = useState({
        loading: false,
        authenticate: false,
        errors: {},
        showPassword: false,
        success: false
    })

    const validatePassword = (password) => {
        if (!password) return "Password is required";
        return "";
    }

    const handleInputsChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))

        //Clear error when user start typing
        if (formState.errors[name]) {
            setFormState(prev => ({
                ...prev,
                [name]: ""
            }))
        }

    }

    const validateForm = () => {
        const errors = {
            email: validateEmail(formData.email),
            password: validatePassword(formData.password)
        }

        //Remove empty errors
        Object.keys(errors).forEach(key => {
            if (!errors[key]) delete errors[key];
        })

        setFormState(prev => ({
            ...prev,
            loading: false,
            errors
        }))

        return Object.keys(errors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        const userData = {
            "email": formData.email,
            "password": formData.password
        }

        setFormState(prev => ({
            ...prev,
            loading: true
        }))

        try {
            const response = await loginUser(userData);
            // console.log(response)
            if (response.status === 200 && response.statusText === "OK") {
                toast.success(response.data.message)
                if (response.data.user?.role === "user") {
                    navigate('/user-dashboard')
                }
                else if (response.data.user?.role === "company") {
                    navigate('/user-company')
                }
            }
            setFormState(prev => ({
                ...prev,
                loading: false
            }))

        } catch (error) {
            setFormState(prev => ({
                ...prev,
                loading: false,
                errors: {
                    submit: error.error || "Login failed, please check your infomations "
                }
            }))
            toast.error("Login failed, please check your infomations")
        }
    }

    return (
        <div className='min-h-screen flex justify-center items-center '
        >
            <motion.div
                initial={{ opacity: 0, y: -150 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className='shadow-lg bg-gray-50 p-4 rounded-lg max-w-md w-full'
            >
                <div className='text-center mb-8'>
                    <h2 className='text-3xl bg-linear-to-r from-indigo-300 to-purple-700 bg-clip-text text-transparent font-bold mb-2'>Sign In</h2>
                    <p className='text-gray-600'>Sign In to your platform account</p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6' noValidate>
                    <div className=''>
                        <label className='block font-medium text-gray-700 mb-2'>Email Address</label>
                    </div>
                    <div className='relative'>
                        <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleInputsChange}
                            className={`w-full pl-10 pr-12 py-3 rounded-lg border ${formState.errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-transparent transition-colors `}
                            placeholder='Enter your email address' />
                        {formState.errors.email && (
                            <p className='text-red-500 mt-1 text-sm flex items-center'>
                                <AlertCircle className='w-4 h-4 mr-2' />
                                {formState.errors.email}
                            </p>
                        )}
                    </div>
                    <div className=''>
                        <label className='block font-medium text-gray-700 mb-2'>Password</label>
                        <div className='relative'>
                            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                            <input
                                type={formState.showPassword ? "text" : "password"}
                                name='password'
                                value={formData.password}
                                onChange={handleInputsChange}
                                className={`w-full pl-10 pr-12 py-3 rounded-lg border ${formState.errors.password ? "border-red-500" : "border-gray-300"} focus:ring-blue-500 focus:border-transparent transition-colors `}
                                placeholder='Enter your password'
                            />
                            <button
                                type='button'
                                onClick={() => setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                                className='absolute right-3 top-1/2 transition -translate-y-1/2 text-gray-400 w-5 h-5'
                            >
                                {formState.showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                            </button>
                        </div>
                        {formState.errors.password && (
                            <p className='text-red-500 mt-1 text-sm flex items-center ' >
                                <AlertCircle className='w-4 h-4 mr-2' />
                                {formState.errors.password}
                            </p>
                        )}
                    </div>
                    {/* Submit Error */}
                    {formState.errors.submit && (
                        <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                            <p className='flex text-red-700 text-sm items-center'>
                                <AlertCircle className='w-4 h-4 mr-2' />
                                {formState.errors.submit}
                            </p>
                        </div>
                    )}
                    {/*  SUBMIT BUTTON */}
                    <button
                        type='submit'
                        disabled={formState.loading}
                        className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg cursor-pointer font-semibold tracking-wider hover:from-blue-700 to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2'
                    >
                        {formState.loading ?
                            <>
                                <Loader className='w-5 h-5 animate-spin' />
                                <span className=''>Sign In ...</span>
                            </> :
                            <>
                                <span>Sign In</span>
                            </>
                        }
                    </button>
                    {/* Sign Up NavLink */}
                    <div className='text-center'>
                        <p className='text-gray-600 '>
                            Don't have an account? {" "}
                            <NavLink to="/register" className='text-blue-600 font-medium hover:text-blue-700'>
                                Create here
                            </NavLink>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default Login
