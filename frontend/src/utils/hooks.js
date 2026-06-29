import { useState } from "react"


export function useFetchProjectsViaStatus(projects){
    const [projectCreated, setProjectCreated] = useState([])
    const [projectInProgress, setProjectInProgress] = useState([])
    const [projectFinished, setProjectFinished] = useState([])

    const loadProjectViaStatus = () => {
        setProjectCreated((projects?.filter((p) => p.status === "created")))
        setProjectInProgress((projects?.filter((p) => p.status === "in progress")))
        setProjectFinished((projects?.filter((p) => p.status === "finished")))
    }

    return {
        projectCreated, 
        projectInProgress,
        projectFinished,
        loadProjectViaStatus
    }
}
