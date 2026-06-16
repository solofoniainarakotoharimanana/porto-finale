import React, { useCallback, useMemo } from 'react'
import TitleComponent from './TitleComponent'
import useProjectStore from '../store/projectStore'
import { useEffect } from 'react'
import { useState } from 'react'
import ModalProjectList from '../utils/ModalProjectList'
import { useNavigate } from 'react-router-dom'
import { useFetchProjectsViaStatus } from '../utils/hooks'



const Userprojects = () => {
    const navigate = useNavigate();

    const [projectsCreated, setProjectsCreated] = useState([])
    const [projectsInProgress, setProjectsInProgress] = useState([])
    const [projectsFinished, setProjectsinished] = useState([])

    const {
        projects,
        getProjectOfUserConnected,
        getProjectByStatus,
        setStatus,
        statusClicked
    } = useProjectStore(state => state)

    useEffect(() => {
        getProjectOfUserConnected();
    }, [])

    useEffect(() => {
        setProjectsCreated(getProjectByStatus("created"));
        setProjectsInProgress(getProjectByStatus("in progress"));
        setProjectsinished(getProjectByStatus("finished"));
    }, [projects])

    const handleSeeAllClick = (status) => {
        setStatus(status);
        navigate("/projects-according-status")
    }
    console.log("USER PROJECTS >>> ")

    return (
        <div>
            <TitleComponent title="My project infos" />
            <div
                className='grid
                    xl:grid-cols-3 lg:grid-cols-3
                    md:grid-cols-2 sm:grid-cols-1 gap-4'>
                <div className='bg-blue-700 rounded-sm p-5 shadow-lg hover:translate-y-1 transition delay-150 duration-300'>
                    <div className='flex justify-center align-center gap-5 text-white'>
                        <p className=' font-bold text-4xl'>
                            {projectsCreated?.length}
                        </p>
                        <h1 className='self-end font-bold text-4xl '>Project{projectsCreated?.length > 1 ? "s" : ""} Created</h1>
                    </div>
                    <div className='text-sm text-gray-100 my-3'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi sapiente praesentium perspiciatis! Modi, perferendis!
                    </div>
                    <div className='flex justify-end'>
                        <button
                            onClick={() => handleSeeAllClick('created')}
                            className='bg-slate-300
                            py-2 px-3 rounded-lg text-sm cursor-pointer
                             text-blue-600 font-semibold hover:text-blue-500 hover:bg-slate-2'
                            href='#'>See all </button>
                    </div>

                </div>
                <div className='bg-orange-500 rounded-sm p-5 shadow-lg hover:translate-y-1 transition delay-150 duration-300'>
                    <div className='flex justify-center align-center gap-5 text-white'>
                        <p className=' font-bold text-4xl'>{projectsInProgress?.length}</p>
                        <h1 className='self-end font-bold text-4xl '>Project{projectsInProgress?.length > 1 ? "s" : ""}  In Progress</h1>
                    </div>
                    <div className='text-sm text-white my-3'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi sapiente praesentium perspiciatis! Modi, perferendis!
                    </div>
                    <div className='flex justify-end'>
                        <button
                            onClick={() => handleSeeAllClick('in progress')}
                            className='bg-slate-300
                            py-2 px-3 rounded-lg text-sm cursor-pointer
                             text-blue-600 font-semibold hover:text-blue-500 hover:bg-slate-2'
                            href='#'>See all </button>
                    </div>

                </div>
                <div className='bg-green-500 rounded-sm p-5 shadow-lg hover:translate-y-1 transition delay-150 duration-300'>
                    <div className='flex justify-center align-center gap-5 text-white'>
                        <p className=' font-bold text-4xl'>{projectsFinished?.length}</p>
                        <h1 className='self-end font-bold text-4xl '>Project{projectsFinished?.length > 1 ? "s" : ""} Finished</h1>
                    </div>
                    <div className='text-sm text-white my-3'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi sapiente praesentium perspiciatis! Modi, perferendis!
                    </div>
                    <div className='flex justify-end'>
                        <button
                            onClick={() => handleSeeAllClick('finished')}
                            className='bg-slate-300
                            py-2 px-3 rounded-lg textSee all cursor-pointer
                             text-blue-600 font-semibold hover:text-blue-500 hover:bg-slate-2'
                            href='#'>See all </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Userprojects)
