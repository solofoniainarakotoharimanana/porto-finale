import { AlertCircle, FileText, Upload, User } from 'lucide-react';
import React, { useState } from 'react'
import { validateAvatar } from '../utils/Helper.js';


const categories = [
    "IT",
    "Environment",
    "BTP",
    "Electronics"
];

const NewProject = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: ""
    });

    const [formState, setFormState] = useState({
        loading: false,
        success: false,
        // showPassword: false,
        errors: {},
        fileDescription: null
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = () => { }

    const handleChangeAvatar = (e) => {
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
                    fileDescription: e.target.result,
                    errors: { ...prev.errors, avatar: "" }
                }))
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className='my-8 px-8'>
            <h3
                className='text-center 
                text-4xl font-semibold
                bg-linear-to-r from-amber-400 to-amber-700 text-shadow-md  bg-clip-text  text-transparent'>Create a new project</h3>
            <form noValidate
                onSubmit={handleSubmit}
                className='space-y-6'>
                <div className='my-6'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Title *</label>
                    <div className='relative'>
                        <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                        <input
                            type='text'
                            name='title'
                            value={formData.title}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-12 py-3 rounded-lg border
                                    ${formState.errors.title ? "border-red-500" : "border-gray-300"} 
                                    focus:ring-blue-500 focus:border-transparent transition-colors`}
                            placeholder='Enter your title'
                        />
                        {formState.errors.title && (
                            <p className='text-red-500 mt-1 text-sm flex items-center'>
                                <AlertCircle className='w-4 h-4 mr-2' />
                                {formState.errors.title}
                            </p>
                        )}
                    </div>
                </div>
                <div className='my-6'>
                    <div className="mb-2">
                        <label
                            htmlFor="project-description"
                            className="block text-slate-800 font-semibold text-md">Description</label>
                    </div>
                    <div className="relative">
                        <textarea type="text"
                            rows='5'
                            cols="5"
                            id="project-description"
                            className="w-full pl-6 pr-12 py-3 outline-none bg-gray-50 rounded-lg border"
                            placeholder=""
                            name="description"
                            value={formData.decsription}
                            onChange={handleInputChange}
                        ></textarea>
                        {formState.errors.description && (
                            <p className='text-red-500 mt-1 text-sm flex items-center'>
                                <AlertCircle className='w-4 h-4 mr-2' />
                                {formState.errors.description}
                            </p>
                        )}
                    </div>
                </div>
                <div className="my-6">
                    <div className="mb-2">
                        <label
                            htmlFor="project-title"
                            className="block text-slate-800 font-semibold text-md">Category</label>
                    </div>
                    <div className="relative">
                        <select name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className='w-full pl-6 pr-12 py-3
                            outline-none bg-gray-50 rounded-lg border'>
                            <option >Select category</option>
                            {categories.map((category, index) => {
                                return <option key={index} >{category}</option>
                            })}
                        </select>
                        {formState.errors.description && (
                            <p className='text-red-500 mt-1 text-sm flex items-center'>
                                <AlertCircle className='w-4 h-4 mr-2' />
                                {formState.errors.category}
                            </p>
                        )}
                    </div>
                </div>
                <div className='my-6'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Attachment file (Optional)
                    </label>
                    <div className='flex items-center space-x-4'>
                        <div className='w-16 h-16 rounded-full flex items-center justify-center overflow-hidden '>
                            {
                                formState.fileDescription ?
                                    (<img
                                        src={formState.fileDescription}
                                        alt='Avatar Preview'
                                        className='w-full h-full object-cover'
                                    />) : (
                                        <FileText className='w-10 h-10 border-2 rounded-full p-2 bg-gray-100 text-gray-500' />
                                    )
                            }
                        </div>
                        <div className='flex-1'>
                            <input
                                type='file'
                                id='avatar'
                                accept='.jpg,.png,.jepg, .pdf'
                                onChange={handleChangeAvatar}
                                className='hidden'
                            />
                            <label
                                htmlFor='avatar'
                                className='cursor-pointer bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-4'
                            >
                                <Upload className='w-4 h-4' />
                                <span>Upload Photo</span>
                                <p className='text-xs text-gray-500 mt-1'>JPG, PNG, PDF up to 5Mb</p>
                            </label>
                        </div>
                    </div>
                    {/* {formState.errors.avatar && (
                    <p className='text-red-500 mt-1 text-sm flex items-center ' >
                    <AlertCircle className='w-4 h-4 mr-1' />
                    {formState.errors.password}
                    </p>
                    )} */}
                </div>
                <div>
                    <button
                        type='submit'
                        className='w-full bg-blue-600 
                        text-white font-semibold cursor-pointer hover:bg-blue-700 hover:text-white/95
                        rounded-md py-2'>Create new project</button>
                </div>

            </form>
        </div>
    )
}

export default NewProject
