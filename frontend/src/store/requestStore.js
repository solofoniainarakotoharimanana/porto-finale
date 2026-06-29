import { create } from "zustand"
import API from "../utils/api.js";

const useRequestStore = create(
    (set, get) => ({
        requests: null,
        validRequest: async (projectId, requestData) => {
            const response = await API.post(`/request/valid-request/${projectId}`, requestData, {
                withCredentials: true
            })

            return response;
        },
        getRequestViaProject: async (projectId) => {
            const response = await API.get(`/request/get-request-project/${projectId}`)
            // console.log("RESPONSE >>> ", response);
            return response.data.request;
        } 
    })
)

export default useRequestStore;