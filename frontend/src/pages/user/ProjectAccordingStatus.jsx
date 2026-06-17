import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useAuthStore from '../../store/store';
import Header from '../../components/Header';

import useProjectStore from '../../store/projectStore';
import TitleComponent from '../../components/TitleComponent';
import useCategoryStore from '../../store/categoryStore';
import CategoryList from '../../components/projects/CategoryList';
import ProjectsViaStatus from '../../components/projects/ProjectsViaStatus';



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

    const {
        fetchCategories,
        categories
    } = useCategoryStore(state => state)

    const [projectsToSee, setProjectsToSee] = useState([]);
    const [titlePage, setTitlePage] = useState("")
    const [catToFilter, setCatToFilter] = useState('');

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

        //FETCH CATEGORIES
        fetchCategories();
    }, [])

    const filterByCategory = projectsToSee?.filter((p) => {
        if (catToFilter == "") {
            return projectsToSee;
        }
        else {
            return p.category.title.toLocaleLowerCase() === catToFilter.toLocaleLowerCase()
        }

    })

    return (
        <div>
            <Header token={token} user={user} logoutUser={logoutUser} />
            <main className='container mx-auto'>
                {/* {projectsToSee?.map((p) => {
                    return <li key={p._id}>{p.title}</li>
                })} */}
                <TitleComponent title={titlePage} />
                <CategoryList
                    catToFilter={catToFilter}
                    setCatToFilter={setCatToFilter}
                    categories={categories} />
                <ProjectsViaStatus
                    projects={filterByCategory} />
            </main>

        </div>
    )
}

export default ProjectAccordingStatus
