import { create } from "zustand";

import API from "../utils/api.js";
import { use } from "react";
import { immer } from 'zustand/middleware/immer';

const useProjectStore = create(
    immer((set, get) => ({
        projects: null,
        getProjectOfUserConnected: async () => {
            const response = await API.get('/user/my-projects');
            set({ projects: response.data.projects })
            
            return response.data.projects;
        }        
    }))
)

export default useProjectStore;

