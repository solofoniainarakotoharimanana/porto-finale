import React, { useState } from 'react'
import { motion } from "framer-motion";

import uploadImage from "../../utils/UploadImage.js"

import {
    User,
    Mail,
    Lock,
    Upload,
    Eye,
    EyeOff,
    UserCheck,
    Building2,
    CheckCircle,
    AlertCircle,
    Loader,
    User2
} from "lucide-react"
import { NavLink, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword, validateAvatar } from "../../utils/Helper.js"

import { toast } from "react-hot-toast"
import API from '../../utils/api.js';
import useAuthStore from '../../store/store.js';

const Register = () => {
    const navigate = useNavigate();
    const { registerUser } = useAuthStore()
    const [formData, setFormData] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role: "",
        avatar: null
    })

    const [formState, setFormState] = useState({
        loading: false,
        success: false,
        showPassword: false,
        errors: {},
        avatarPreview: null
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        //Clear errors when start typing
        if (formState.errors[name]) {

            setFormState(prev => ({
                ...prev,
                // [name]: ""
                errors: { ...prev.errors, [name]: "" }
            }))
        }
    }
    const handleRoleChange = (role) => {
        setFormData((prev) => ({ ...prev, role }));
        if (formState.errors.role) {
            setFormData((prev) => ({
                ...prev,
                errors: { ...prev.errors, role: "" }
            }))
        }
    }

    const handleAvatarChange = (e) => {
        // console.log("FILE >>> ", e.target.file[0]);
        const file = e.target.files[0];
        if (file) {
            const error = validateAvatar(file);
            if (error) {
                setFormState((prev) => ({
                    ...prev,
                    errors: { ...prev.errors, avatar: error }
                }))

                return;
            }

            setFormData((prev) => ({ ...prev, avatar: file }));

            //Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormState(prev => ({
                    ...prev,
                    avatarPreview: e.target.result,
                    errors: { ...prev.errors, avatar: "" }
                }))
            }
            reader.readAsDataURL(file);
        }
    }

    const validateForm = () => {
        const errors = {
            username: !formData.username ? "Please enter your username " : "",
            firstname: !formData.firstname ? "Please enter your firstname " : "",
            lastname: !formData.lastname ? "Please enter your lastname " : "",
            email: validateEmail(formData.email),
            password: validatePassword(formData.password),
            role: !formData.role ? "Please select your role" : "",
            avatar: ""
        }

        //Remove empty errors
        Object.keys(errors).forEach((key) => {
            if (!errors[key]) delete errors[key];
        })

        setFormState((prev) => ({ ...prev, errors }));
        console.log("FORM STATE >>> ", Object.keys(errors))
        // console.log("FORM STATE >>> ", Object.keys(errors) === 0)

        return Object.keys(errors).length === 0;

        // return Object.keys(errors) === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setFormState((prev) => ({ ...prev, loading: true }));
        try {
            let avatarUrl = "";

            //UPLOAD IMAGE IF PRESENT
            // if (formData.avatar) {
            //     const imgUploadRes = await uploadImage(formData.avatar);

            //     avatarUrl = imgUploadRes || "";
            // }


            const registerData = {
                username: formData.username,
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                profileImg: avatarUrl || ""
            }

            const response = await registerUser(registerData);
            toast.success(response.data?.message)
            navigate('/login');

            //HANDLE SUCCESS REGISTRATION
            setFormState((prev) => ({
                ...prev,
                loading: false,
                errors: {}
            }))


        } catch (error) {
            // console.log("ERROR >>> ", error)
            setFormState((prev) => ({
                ...prev,
                loading: false,
                errors: {
                    submit: error.response?.data?.message || "Registration failed. Please try again."
                }
            }))
        }

    }


    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4 py-4'>
            <motion.div
                initial={{ opacity: 0, y: -150 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className='bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full'
            >
                <div className='text-center mb-4'>
                    <h2 className='text-xl font-bold text-gray-900'>
                        Create account
                    </h2>
                    <p className='text-sm text-gray-300'>Join thousand of  professional finding their dream job</p>
                </div>
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className='space-y-6'>
                    {/* username */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Username *</label>
                        <div className='relative'>
                            <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                            <input
                                type='text'
                                name='username'
                                value={formData.username}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-12 py-3 rounded-lg border
                                    ${formState.errors.username ? "border-red-500" : "border-gray-300"} 
                                    focus:ring-blue-500 focus:border-transparent transition-colors`}
                                placeholder='Enter your username'
                            />
                        </div>
                        {formState.errors.username && (
                            <p className='text-red-500 text-sm mt-1 flex items-center'>
                                <AlertCircle className='w-4 h-4 mr-1' />
                                {formState.errors.username}
                            </p>
                        )}
                    </div>
                    {/* FIRSTNAME && LASTNAME */}
                    <div className='flex gap-3'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Firstname *</label>
                            <div className='relative'>
                                <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                                <input
                                    type='text'
                                    name='firstname'
                                    value={formData.firstname}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-12 py-3 rounded-lg border
                                    ${formState.errors.firstname ? "border-red-500" : "border-gray-300"} 
                                    focus:ring-blue-500 focus:border-transparent transition-colors`}
                                    placeholder='Enter your firstname'
                                />
                            </div>
                            {formState.errors.firstname && (
                                <p className='text-red-500 text-sm mt-1 flex items-center'>
                                    <AlertCircle className='w-4 h-4 mr-1' />
                                    {formState.errors.firstname}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Lastname </label>
                            <div className='relative'>
                                <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                                <input
                                    type='text'
                                    name='lastname'
                                    value={formData.lastname}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-12 py-3 rounded-lg border
                                    ${formState.errors.lastname ? "border-red-500" : "border-gray-300"} 
                                    focus:ring-blue-500 focus:border-transparent transition-colors`}
                                    placeholder='Enter your lastname'
                                />
                            </div>
                            {formState.errors.lastname && (
                                <p className='text-red-500 text-sm mt-1 flex items-center'>
                                    <AlertCircle className='w-4 h-4 mr-1' />
                                    {formState.errors.lastname}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* EMAIL */}
                    <div className=''>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Email adress *
                        </label>
                        <div className='relative'>
                            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                            <input
                                type='email'
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder='Enter your email address'
                                className={`w-full pl-10 pr-12 py-3 rounded-lg border
                                ${formState.errors.email ? "border-red-500" : "border-gray-300"} 
                                focus:ring-blue-500 focus:border-transparent transition-all`}
                            />
                        </div>
                        {formState.errors.email && (
                            <p className='text-red-500 text-sm mt-1 flex items-center'>
                                <AlertCircle className='w-4 h-4 mr-1' />
                                {formState.errors.email}
                            </p>
                        )}
                        <div className=''>
                            <label className='block font-medium text-gray-700 mb-2'>Password</label>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                                <input
                                    type={formState.showPassword ? "text" : "password"}
                                    name='password'
                                    value={formData.password}
                                    onChange={handleInputChange}
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
                    </div>

                    {/* AVATAR UPLOAD */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Profile picture (Optional)
                        </label>
                        <div className='flex items-center space-x-4'>
                            <div className='w-16 h-16 rounded-full flex items-center justify-center overflow-hidden '>
                                {
                                    formState.avatarPreview ?
                                        (<img
                                            src={formState.avatarPreview}
                                            alt='Avatar Preview'
                                            className='w-full h-full object-cover'
                                        />) : (
                                            <User className='w-10 h-10 text-gray-400 border-2 rounded-full p-2 bg-gray-100 text-gray-500' />
                                        )
                                }
                            </div>
                            <div className='flex-1'>
                                <input
                                    type='file'
                                    id='avatar'
                                    accept='.jpg,.png,.jepg'
                                    onChange={handleAvatarChange}
                                    className='hidden'
                                />
                                <label
                                    htmlFor='avatar'
                                    className='cursor-pointer bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-4'
                                >
                                    <Upload className='w-4 h-4' />
                                    <span>Upload Photo</span>
                                    <p className='text-xs text-gray-500 mt-1'>JPG, PNG up to 5Mb</p>
                                </label>
                            </div>
                        </div>
                        {formState.errors.avatar && (
                            <p className='text-red-500 mt-1 text-sm flex items-center ' >
                                <AlertCircle className='w-4 h-4 mr-1' />
                                {formState.errors.password}
                            </p>
                        )}
                    </div>
                    {/* ROLE SELECTION */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-3'>
                            I am a *
                        </label>
                        <div className='flex gap-3'>
                            <input
                                type="radio"
                                name="role"
                                value={formData.role === "user" ? "user" : ""}
                                checked={formData.role === 'user'}
                                onChange={() => handleRoleChange('user')}
                            /> User
                            <input
                                type="radio"
                                name="role"
                                value={formData.role === "company" ? "company" : ""}
                                checked={formData.role === 'company'}
                                onChange={() => handleRoleChange('company')}
                            /> Company
                        </div>
                        {/* <div className='grid grid-cols-2 gap-4'>
                            <button
                                type='button'
                                onClick={() => handleRoleChange('jobsekeer')}
                                className={`p-4 rounded-lg border-2 transition-all cursor-pointer
                                ${formData.role} === 'jobsekeer' ? 
                                'border-blue-200 bg-blue-50 text-blue-700'
                                : 'border-gray-500 hover:border-gray-300' `}
                            >
                                <UserCheck className='w-8 h-8 mx-auto mb-2 font-bold' />
                                <div className='font-semibold text-gray-800'>Job Seeker</div>
                                <div className='text-xs text-gray-500'>
                                    Looking for opportunities
                                </div>
                            </button>

                            <button
                                type='button'
                                onClick={() => handleRoleChange('employer')}
                                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${formData.role} === 'employer' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300' `}
                            >
                                <Building2 className='w-8 h-8 mx-auto mb-2 font-bold' />
                                <div className='font-semibold text-gray-800'>Employer</div>
                                <div className='text-xs text-gray-500'>
                                    Hiriing talent
                                </div>
                            </button>
                        </div> */}
                        {
                            formState.errors.role && (
                                <p className='text-red-500 mt-1 text-sm flex items-center'>
                                    <AlertCircle className='w-4 h-4 mr-1' />
                                    {formState.errors.role}
                                </p>
                            )
                        }
                    </div>
                    {/* SUBMIT ERROR */}
                    {formState.errors.submit && (
                        <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                            <p className='text-red-500 mt-1 text-sm flex items-center'>
                                <AlertCircle className='w-4 h-4 mr-1' />
                                {formState.errors.submit}
                            </p>
                        </div>
                    )}

                    {/* SUBMIT BUTTON */}
                    <button
                        type='submit'
                        disabled={formState.loading}
                        className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-2 cursor-pointer hover:from-blue-800 hover:to-purple-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                    >
                        {formState.loading ? (
                            <>
                                <Loader className='w-5 h-5 animate-spin' />
                                <span className=''>Creating account ...</span>
                            </>
                        ) : (
                            <span>Create account</span>
                        )}
                    </button>

                    {/* LOGIN LINK */}
                    <div className='text-center'>
                        <p className='text-gray-600'>
                            Already an account? {" "}
                            <NavLink to="/login" className='text-blue-600 hover:text-blue-700 font-medium'>Sign in here</NavLink>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>

    )
}

export default Register
