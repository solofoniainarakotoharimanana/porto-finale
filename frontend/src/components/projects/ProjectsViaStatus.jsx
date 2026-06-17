import React, { useState } from 'react'
import ProjectItem from './ProjectItem'
import { MoveLeft, RefreshCw } from 'lucide-react'
import { useLoadMore } from '../../hooks/useloadMore'
import { NavLink } from "react-router-dom";

const ProjectsViaStatus = ({ projects, setCatToFilter }) => {
    const { visibleCount, visibleItems, handleLoadMore } = useLoadMore(3, projects);

    return (
        <div className='my-12'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 mb-5'>
                {
                    projects.length > 0 ?
                        visibleItems.map((project) => {
                            return <ProjectItem setCatToFilter={setCatToFilter}
                                key={project._id}
                                project={project}
                            />
                        }) : "No to products found"
                }
            </div>
            {
                visibleCount < projects.length && <button
                    onClick={handleLoadMore}
                    className='flex gap-2 w-fit p-2 text-sm 
                    bg-slate-700 text-white
                    rounded-md cursor-pointer
                    hover:bg-slate-800 hover:text-white/90'>
                    <RefreshCw size={15} />
                    Load more
                </button>
            }

            <NavLink
                to='/user-dashboard'
                className="flex gap-1 py-2 px-3 bg-green-600 text-white/80 w-fit mt-4"

            >
                <MoveLeft size={15} />
                Back
            </NavLink>

        </div>
    )
}

export default ProjectsViaStatus
