import React from 'react'
import TitleComponent from './TitleComponent'
import useProjectStore from '../store/projectStore'
import { useEffect } from 'react'
import { useState } from 'react'

const Userprojects = () => {
    const { projects, getProjectOfUserConnected } = useProjectStore(state => state)
    const [projectCreated, setProjectCreated] = useState([])
    const [projectInProgress, setProjectInProgress] = useState([])
    const [projectFinished, setProjectFinished] = useState([])

    useEffect(() => {
        getProjectOfUserConnected()
    }, [])

    useEffect(() => {
        setProjectCreated((projects?.filter((p) => p.status === "created")))
        setProjectInProgress((projects?.filter((p) => p.status === "in progress")))
        setProjectFinished((projects?.filter((p) => p.status === "finished")))
    }, [projects])

    // console.log("PROJECT >>>", projectCreated, projectInProgress, projectFinished)

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
                            {projectCreated?.length}
                        </p>
                        <h1 className='self-end font-bold text-4xl '>Project{projectCreated?.length > 1 ? "s" : ""} Created</h1>
                    </div>
                    <div className='text-sm text-gray-100 my-3'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi sapiente praesentium perspiciatis! Modi, perferendis!
                    </div>
                    <div className='flex justify-end'>
                        <button
                            // onClick={() => setIsModalOpen(true)}
                            // onClick={() => openModal(fetchCreatedProjects(), "List project created")}
                            className='bg-slate-300 
                            py-2 px-3 rounded-lg text-sm cursor-pointer
                             text-blue-600 font-semibold hover:text-blue-500 hover:bg-slate-2'
                            href='#'>See all </button>
                    </div>

                </div>
                <div className='bg-orange-500 rounded-sm p-5 shadow-lg hover:translate-y-1 transition delay-150 duration-300'>
                    <div className='flex justify-center align-center gap-5 text-white'>
                        <p className=' font-bold text-4xl'>{projectInProgress?.length}</p>
                        <h1 className='self-end font-bold text-4xl '>Project{projectInProgress?.length > 1 ? "s" : ""}  In Progress</h1>
                    </div>
                    <div className='text-sm text-white my-3'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi sapiente praesentium perspiciatis! Modi, perferendis!
                    </div>
                    <div className='flex justify-end'>
                        <button
                            // onClick={() => setIsModalOpen(true)}
                            // onClick={() => openModal(fetchInProgressProjects(), "List project in progress")}
                            className='bg-slate-300 
                            py-2 px-3 rounded-lg text-sm cursor-pointer
                             text-blue-600 font-semibold hover:text-blue-500 hover:bg-slate-2'
                            href='#'>See all </button>
                    </div>

                </div>
                <div className='bg-green-500 rounded-sm p-5 shadow-lg hover:translate-y-1 transition delay-150 duration-300'>
                    <div className='flex justify-center align-center gap-5 text-white'>
                        <p className=' font-bold text-4xl'>{projectFinished?.length}</p>
                        <h1 className='self-end font-bold text-4xl '>Project{projectFinished?.length > 1 ? "s" : ""} Finished</h1>
                    </div>
                    <div className='text-sm text-white my-3'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi sapiente praesentium perspiciatis! Modi, perferendis!
                    </div>
                    <div className='flex justify-end'>
                        <button
                            // onClick={() => openModal(fetchFinishedProjects(), "List project finished")}
                            // onClick={() => setIsModalOpen(true)}
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

export default Userprojects
