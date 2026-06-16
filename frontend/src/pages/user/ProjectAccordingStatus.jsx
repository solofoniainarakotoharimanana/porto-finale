import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useAuthStore from '../../store/store';
import Header from '../../components/Header';
// import { useFetchProjectsViaStatus } from '../../utils/hooks';
import useProjectStore from '../../store/projectStore';



const ProjectAccordingStatus = () => {
    const { user, token, isAuthenticate, logoutUser, checkAuth } = useAuthStore(state => state);
    const {
        projects,
        getProjectOfUserConnected,
        projectByStatus,
        setStatus,
        statusClicked,
        getProjectByStatus
    } = useProjectStore(state => state);
    const [projectsToSee, setProjectsToSee] = useState([]);
    const [titlePage, setTitlePage] = useState("")


    useEffect(() => {
        checkAuth();
        if (statusClicked === "created") {
            setTitlePage("PROJECTS CREATED")
            setProjectsToSee(getProjectByStatus('created'))
        }
        else if (statusClicked === "in progress") {
            setTitlePage("PROJECTS IN PROGRESS")
            setProjectsToSee(getProjectByStatus('in progress'))
        }
        else if (statusClicked === "finished") {
            setTitlePage("PROJECTS FINISHED")
            setProjectsToSee(getProjectByStatus('finished'))
        }
    }, [])

    return (
        <div>
            <Header token={token} user={user} logoutUser={logoutUser} />
            <main className='container'>
                {projectsToSee?.map((p) => {
                    return <li key={p._id}>{p.title}</li>
                })}
            </main>

        </div>
    )
}

export default ProjectAccordingStatus
