import { Send, TextAlignJustify, ThumbsUp } from 'lucide-react'
import React from 'react'
import moment from "moment"
import useProjectStore from '../../store/projectStore'
import useAuthStore from '../../store/store'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRequestStore from '../../store/requestStore'
import { useEffect } from 'react'


const ProjectItem = ({ project }) => {
    const { getRequestViaProject } = useRequestStore(state => state)
    const { getProjectById } = useProjectStore()
    const navigate = useNavigate();
    const { likeDislikeProject } = useProjectStore();
    const { user } = useAuthStore(state => state);
    const [likes, setLikes] = useState(project?.likes);
    const isLiked = likes.includes(user?._id);

    const [requestOfProject, setRequestOfProject] = useState(null);
    // const { getProjectById } = useProjectStore();

    // const checkrequestViaProject = async () => {
    //     return await getRequestViaProject(project._id);
    // }
    useEffect(() => {
        const checkrequestViaProject = async () => {
            const response = await getRequestViaProject(project?._id);
            if (response) {
                setRequestOfProject(response)
            }
            // console.log("RESPONSES >>> ", response);
        };

        checkrequestViaProject();

        // setRequestOfProject(responseData);
    }, [])

    const handleLikeProject = async (projectId) => {
        const response = await likeDislikeProject(projectId);
        setLikes(response[0].likes)
    }
    const handleClick = async (projectId) => {
        const project = await getProjectById(projectId);
        navigate(`/completion-request/${projectId}`, { state: project });
    }

    return (
        <div className='border-1 border-slate-400 rounded-md shadow-md'>
            <h3 className={`text-center  w-full font-bold border-b-1 pb-3 pt-8 bg-blue-500 text-white uppercase`}>{project.title}</h3>
            <div className='p-4 flex flex-col'>
                <div className='flex gap-2 items-center'>
                    <TextAlignJustify className='text-blue-400 font-extrabold' size={15} />
                    <span className='text-blue-400 font-bold text-sm'>Description</span>
                </div>
                <p>{project.description}</p>
            </div>
            <div className='p-4 flex'>
                <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-600 inset-ring inset-ring-green-500/20">{project.status}</span>
            </div>
            <div className='p-4'>
                <div className='flex gap-4 justify-between'>
                    <div className="flex gap-1 justify-center align-center hover:cursor-pointer">
                        <ThumbsUp
                            onClick={() => handleLikeProject(project._id)}
                            className={`mt-1 ${isLiked ? 'text-blue-700' : ''}`}
                            size={15} />{" "}
                        {likes.length > 0 && <span className='font-semibold'>{likes.length} like{likes.length > 1 ? 's' : ''}</span>}

                    </div>

                    <span className='text-sm text-gray-400'>Created: {moment(project.createAt).fromNow()}</span>
                </div>
            </div>
            <div className='p-4 flex justify-end w-full'>
                {
                    !requestOfProject ? (
                        <button
                            onClick={() => handleClick(project._id)}
                            className='bg-blue-700 
                            text-white text-sm
                            py-2 px-2 rounded-md
                            cursor-pointer flex gap-1 w-fit
                            transition-all duration-300
                            hover:bg-blue-600 hovver:text-white/75
                            hover:-translate-y-1 hover:shadow-md
                            '>
                            <Send size={15} />
                            Submit request
                        </button>
                    ) :
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20">Request already sent, awaiting response</span>

                }

            </div >
        </div >
    )
}

export default ProjectItem
