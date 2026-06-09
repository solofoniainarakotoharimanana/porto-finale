import React, { useEffect, useState } from 'react'
import TitleComponent from './TitleComponent'
import { List, Pencil, Plus } from 'lucide-react'
import NewProject from './NewProject';
import useProjectStore from '../store/projectStore';


const companies = [
    {
        name: "DevOpt"
    },
    {
        name: "Santosha"
    },
    {
        name: "Rina BTP"
    },
    {
        name: "RAVO COnstruct"
    },
    {
        name: "Kentia Consulting"
    },
    {
        name: "ONG Rivotra"
    }
]

const ListAndNewProject = () => {

    const [isNewProject, setIsNewProject] = useState(true);
    const {
        projects,
        getProjectOfUserConnected,
    } = useProjectStore();

    useEffect(() => {
        getProjectOfUserConnected()
    }, [])

    return (
        <div className='lg:w-[70%] xl:w-[70%] md:w-[100%] sm:w-[100%] shadow-md bg-white lg:p-4 xl:p-4 md:p-2 rounded-sm'>
            {
                isNewProject ?
                    <button
                        onClick={() => setIsNewProject(false)}
                        className="bg-blue-600 
                text-white font-semibold
                py-2 px-3 flex gap-2 justify-center
                rounded-md shadow-sm cursor-pointer transition-colors duration-300 hover:bg-blue-700 hover:text-white/75
                align-center">
                        <Plus size={20} />
                        New project
                    </button>
                    :
                    <button
                        onClick={() => setIsNewProject(true)}
                        className="bg-green-600 
                text-white font-semibold
                py-2 px-3 flex gap-2 justify-center
                rounded-md shadow-sm cursor-pointer transition-colors duration-300 hover:bg-green-700 hover:text-white/75
                align-center">
                        <List size={20} />
                        Project list
                    </button>
            }

            {
                !isNewProject
                    ?
                    (
                        <NewProject />
                    )
                    :
                    (
                        <div className='grid lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 my-4 gap-3'>
                            {
                                projects && projects.map((p) => {
                                    return (
                                        <div key={p._id}
                                            className='border-gray-300 border-1 rounded-sm shadow-sm'>
                                            <div className=''>
                                                <h1
                                                    className='bg-linear-to-r p-3 
                                            from-indigo-500 to-blue-500
                                            bg-clip-text text-transparent
                                            text-center font-extrabold text-xl
                                    '>
                                                    {p.title}
                                                </h1>
                                                <hr className='border-1 border-gray-300'></hr>
                                                <p className='text-center text-md p-3 text-gray-400 '>
                                                    {p.description}
                                                </p>
                                                <div className='flex gap-2 p-3'>
                                                    <span className='text-md text-blue-500'>Category:</span>
                                                    <span className='font-bold'>{p.category.title}</span>
                                                </div>
                                                <div className='flex p-3 justify-between w-full'>
                                                    <p className='text-md font-semibold text-orange-500 self-end'>{p.status}</p>
                                                    <button className='self-end 
                                            border-1 border-bg-rose-600 bg-transparent
                                            text-orange-600 px-3 py-2 rounded-md
                                            hover:bg-orange-600 hover:text-white hover:border-gray-100
                                            transition-colors duration-500  cursor-pointer
                                            font-extrabold flex gap-2'>
                                                        <Pencil size={20} />
                                                        Detail
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    )
            }
        </div>
    )
}

export default ListAndNewProject
