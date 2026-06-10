import { create } from "zustand";

import API from "../utils/api.js";
import { use } from "react";
import { immer } from 'zustand/middleware/immer';


// Helper to get initial value from URL search params
const getUrlParam = (key, defaultValue) => {
  if (typeof window === 'undefined') return defaultValue;
  const params = new URLSearchParams(window.location.search);
  return params.get(key) || defaultValue;
};

const useProjectStore = create(
    immer((set, get) => ({
        projects: null,
        pages: null,
        page: Number(getUrlParam('page', 1)),
        project: null,
        getProjectOfUserConnected: async () => {
            const response = await API.get('/user/my-projects');
            set({
                projects: response.data.projects,
                pages: response.data.pages,
                page: response.data.pageNumber

            })
            
            return response.data.projects;
        },
        getDetailOfUserProject: async (projectId) => {
            const response = await API.get(`/user/project-detail/${projectId}`);
            
            set({project: response.data.project})
        }
    }))
)

export default useProjectStore;

