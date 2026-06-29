import React, { useCallback, useEffect, useState } from 'react'
import Header from '../Header'
import useAuthStore from '../../store/store';
import useProjectStore from '../../store/projectStore';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    AlertCircle, Building2,
    Calendar, CalendarDays,
    Captions, ChartBarBig,
    ChartColumnStacked, ClipboardClock,
    ClockCheck, FileChartColumnIncreasing,
    Funnel, Loader, LoaderCircle, Rows4,
    TextAlignJustify, ThumbsUp
} from 'lucide-react';
import useCompanyStore from '../../store/companyStore';
import CompanyList from '../company/CompanyList';
import TitleComponent from '../TitleComponent';
import ModalCompanyList from '../company/ModalCompanyList';
import avatar from "../../assets/avatar.png"
import { toast } from "react-hot-toast"
import useRequestStore from '../../store/requestStore.js';


const RequestCompletion = () => {
    const navigate = useNavigate();
    const { validRequest } = useRequestStore(state => state)
    const location = useLocation();
    const [project, setProject] = useState(null);
    const { user, token, isAuthenticate, logoutUser, checkAuth } = useAuthStore(state => state);
    const [showListCompany, setShowListCompany] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idCompanyToChoose, setIdCompanyToChoose] = useState('')

    const {
        company,
        getCompanyById
    } = useCompanyStore(state => state);

    const {
        companies,
        getCompanies
    } = useCompanyStore(state => state)
    // console.log("LOCATION >>>> ", location.state)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        owner: "",
        project: "",
        company: "",
        startDate: null,
        statusInfo: 0,
        completionTime: ''
    })

    const [formState, setFormState] = useState({
        errors: {},
    })

    const validateForm = () => {
        const errors = {
            title: !formData.title ? "Please enter the title " : "",
            description: !formData.description ? "Please enter the description " : "",
            project: !formData.project ? "Please enter the project " : "",
            company: !formData.company ? "You must choose a company " : "",
            startDate: !formData.startDate ? "Please enter the start date " : "",
            completionTime: !formData.completionTime ? "Please enter the completionTime" : "",
        }

        //Remove empty errors
        Object.keys(errors).forEach((key) => {
            if (!errors[key]) delete errors[key];
        })

        setFormState((prev) => ({ ...prev, errors }));
        console.log(errors)

        return Object.keys(errors).length === 0;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        setProject(location.state);
    }, [])


    useEffect(() => {
        setIdCompanyToChoose(idCompanyToChoose)
        setFormData((prevState) => ({
            ...prevState,
            company: idCompanyToChoose,
            project: project?._id
        }))

        getCompanyById(idCompanyToChoose)
    }, [idCompanyToChoose])

    const handleShowModalListCompany = async (e) => {
        e.preventDefault();
        setIsModalOpen(true);
        await getCompanies();
    }

    const handleChooseMe = useCallback((companyId) => {
        setIsModalOpen(false);
        setIdCompanyToChoose(companyId)
    }, []);

    const handleSendRequest = async (e, projectId) => {
        e.preventDefault();
        if (!validateForm()) return;

        const response = await validRequest(projectId, formData);
        toast.success(response.data.message);
        navigate("//projects-according-status");

    }

    return (
        <div>
            <Header token={token} user={user} logoutUser={logoutUser} />
            <main className='container mx-auto mt-4 p-4'>
                <div className='bg-white-95 p-4 rounded-md shadow-sm'>
                    <TitleComponent title="Application form for implementation" />
                    <div className=''>
                        <h4 className='text-xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent py-2'>
                            Project information
                        </h4>
                        <form onSubmit={(e) => handleSendRequest(e, project._id)}>
                            <input
                                type="text"
                                id="id-project"
                                name='project'
                                value={formData.project}
                                // onChange={handleInputChange}
                                placeholder="Find company by name"
                                className="w-[40%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                            <div className='grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols2 sm:grid-cols-1 gap-3'>
                                <div className='flex flex-col'>
                                    <div className='flex  gap-2 mt-3 text-gray-500 font-bold text-sm mb-2'>
                                        <Captions />
                                        <span className='text'>Project title</span>
                                    </div>
                                    <p className='font-medium text-sm'>{project?.title}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='flex  gap-2 mt-3 text-gray-500 font-bold text-sm mb-2'>
                                        <TextAlignJustify />
                                        <span className='text'>Description</span>
                                    </div>
                                    <p className='font-medium text-sm'>{project?.description}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='flex  gap-2 mt-3 text-gray-500 font-bold text-sm mb-2'>
                                        <ChartBarBig />
                                        <span className='text'>Status</span>
                                    </div>
                                    <p className='font-bold text-indigo-400 uppercase'>{project?.status}</p>
                                </div>
                            </div>
                            <h4 className='text-xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent py-2'>
                                Add information of request
                            </h4>
                            <div className='grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols2 sm:grid-cols-1 gap-3'>
                                <div className='flex flex-col'>
                                    <div className='flex  gap-2 mt-3 text-gray-500 font-bold text-sm mb-2'>
                                        <ClipboardClock />
                                        <span className='text'>Title</span>
                                    </div>
                                    <input
                                        type="text"
                                        id="title"
                                        name='title'
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Enter a title"
                                        className="w-[95%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                </div>
                                {formState.errors.title && (
                                    <p className='text-red-500 text-sm mt-1 flex items-center'>
                                        <AlertCircle className='w-4 h-4 mr-1' />
                                        {formState.errors.title}
                                    </p>
                                )}
                                <div className='flex flex-col'>
                                    <div className='flex  gap-2 mt-3 text-gray-500 font-bold text-sm mb-2'>
                                        <TextAlignJustify />
                                        <span className='text'>Description</span>
                                    </div>
                                    <textarea
                                        type="text"
                                        id="title"
                                        name='description'
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter description"
                                        className="w-[95%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    ></textarea>
                                </div>
                                {formState.errors.description && (
                                    <p className='text-red-500 text-sm mt-1 flex items-center'>
                                        <AlertCircle className='w-4 h-4 mr-1' />
                                        {formState.errors.description}
                                    </p>
                                )}
                                <div className='flex flex-col'>
                                    <div className='flex  gap-2 mt-3 text-gray-500 font-bold text-sm mb-2'>
                                        <ClockCheck />
                                        <span className='text'>Completion time</span>
                                    </div>
                                    <input
                                        type="text"
                                        id="completionTime"
                                        name='completionTime'
                                        value={formData.completionTime}
                                        onChange={handleInputChange}
                                        placeholder="Enter a completion time"
                                        className="w-[95%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                </div>
                                {formState.errors.completionTime && (
                                    <p className='text-red-500 text-sm mt-1 flex items-center'>
                                        <AlertCircle className='w-4 h-4 mr-1' />
                                        {formState.errors.completionTime}
                                    </p>
                                )}
                                <div className='flex flex-col'>
                                    <div className='flex  gap-2 mt-3 text-gray-500 font-bold text-sm mb-2'>
                                        <CalendarDays />
                                        <span className='text'>Start date</span>
                                    </div>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name='startDate'
                                        value={formData.startDate || ""}
                                        onChange={handleInputChange}
                                        placeholder="Enter a start date"
                                        className="w-[95%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                </div>
                                {formState.errors.startDate && (
                                    <p className='text-red-500 text-sm mt-1 flex items-center'>
                                        <AlertCircle className='w-4 h-4 mr-1' />
                                        {formState.errors.startDate}
                                    </p>
                                )}
                                <div className='flex flex-col'>
                                    <div className='flex  gap-2 mt-3 text-gray-500 font-bold text-sm mb-2'>
                                        <Building2 />
                                        <span className='text'>Company</span>
                                    </div>
                                    <input
                                        type="text"
                                        id="title"
                                        name='company'
                                        value={formData.company || ""}
                                        onChange={handleInputChange}
                                        // placeholder="Enter a title"
                                        className="hidden w-[95%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                    <div className='flex gap-2 my-3'>
                                        {
                                            idCompanyToChoose ? (
                                                <>
                                                    <img
                                                        className='rounded-full object-cover w-8 '
                                                        src={company?.profileImg ? company?.profileImg : avatar}
                                                        alt={company?.username} />
                                                    <p className='font-bold uppercase'>{company?.username}</p>
                                                </>
                                            ) : ""
                                        }

                                    </div>

                                    <button
                                        type='button'
                                        onClick={handleShowModalListCompany}
                                        className='px-3 py-2 bg-indigo-500 text-white rounded-sm cursor-pointer'>
                                        {!idCompanyToChoose ? 'Choose a company ...' : 'Change company'}
                                    </button>

                                </div>
                                {formState.errors.company && (
                                    <p className='text-red-500 text-sm mt-1 flex items-center'>
                                        <AlertCircle className='w-4 h-4 mr-1' />
                                        {formState.errors.company}
                                    </p>
                                )}
                                <div className=''>
                                    <button
                                        type='submit'
                                        // onClick={handleSendRequest}
                                        className='px-3 py-2 bg-green-500 w-[40%] text-white rounded-sm cursor-pointer'>
                                        Send
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* MODAL */}
                    <ModalCompanyList
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        datas={companies}
                        handleChooseMe={handleChooseMe}
                    >
                        {/* <p>This is a native HTML5 dialog styled with simple CSS.</p> */}
                        <button onClick={() => setIsModalOpen(false)}>Confirm</button>
                    </ModalCompanyList>
                </div>
            </main>
        </div>
    )
}

export default RequestCompletion

