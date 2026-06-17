import { create } from "zustand";

import API from "../utils/api.js";

const useCompanyStore = create(
    (set, get) => ({
        companies: null,
        getCompanies: async () => {
            const response = await API.get('/user/get-company');
            set({
                companies: response.data.companies
            })

            return response;
        }
    })
)

export default useCompanyStore;