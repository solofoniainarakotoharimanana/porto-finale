import { create } from "zustand";

import API from "../utils/api.js";

const useCompanyStore = create(
    (set, get) => ({
        companies: null,
        company: null, 
        getCompanies: async () => {
            const response = await API.get('/user/get-company');
            set({
                companies: response.data.companies
            })

            return response;
        },
        getCompanyById: async (companyId) => {
            const response = await API.get(`/user/get-company/${companyId}`);
            set({
                company:  response.data.company 
            })
            return response.data.company;
        }
    })
)

export default useCompanyStore;