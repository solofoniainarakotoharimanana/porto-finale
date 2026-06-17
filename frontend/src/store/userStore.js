import { create } from "zustand";

import API from "../utils/api.js";

const useUserStore = create(
    (set, get) => ({
        followUnfollowCompany: async (companyId) => {
            const response = await API.post(`/user/follow-company/${companyId}`);
           
            
        }
    })
)

export default useUserStore;