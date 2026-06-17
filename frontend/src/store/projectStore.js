import { create } from "zustand";

import API from "../utils/api.js";
// import { use } from "react";
import { immer } from 'zustand/middleware/immer';


// Helper to get initial value from URL search params
const getUrlParam = (key, defaultValue) => {
  if (typeof window === 'undefined') return defaultValue;
  const params = new URLSearchParams(window.location.search);
  return params.get(key) || defaultValue;
};

const useProjectStore = create(
    (set, get) => ({
        projects: null,
        statusClicked: "",
        projectByStatus: null,
        getProjectOfUserConnected: async () => {
            const response = await API.get('/user/my-projects');
            set({
                projects: response.data.projects
            })

            return response.data.projects;
        },
        getDetailOfUserProject: async (projectId) => {
            const response = await API.get(`/user/project-detail/${projectId}`);

            set({ project: response.data.project })
        },
        getProjectByStatus: (status) => {
            set({
                projectByStatus : get().projects?.filter((p) => p.status === status)
            })

            return get().projectByStatus;
        },
        setStatus: (status) => {
            set({ statusClicked: status });
        },
        likeDislikeProject: async (projectId) => {
            const response = await API.post(`user/like-project/${projectId}`)
            const proj = response.data.project;
            const user = response.data.user;

            // console.log(response)

            return [proj, user];
        }
    })
)

export default useProjectStore;

