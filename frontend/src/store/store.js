import {create} from "zustand"
import axios from "axios"
const BASE_URL = "http://localhost:5000/api"
import { immer } from "zustand/middleware/immer";
import API from "../utils/api";

const useAuthStore = create(
    (set) => ({
        user: null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: false,
        // Update state when the user logs in successfully
        loginUser: async (userData) => {
            const response = await API.post(`/auth/login`, userData, {
                withCredentials: true
            });
            localStorage.setItem('token', response.data.token)
            set({ user: response.data.user, isAuthenticated: true, token: response.data.token })
            
            return response;
        },
         // Clear state on logout
        logoutUser: () => async () => {
            await API.post('/auth/logout');
            localStorage.removeItem('token')
            set({ user: null, isAuthenticated: false, token: null })
        },  
        // Check Auth (Trigger on App Mount)
        checkAuth: async () => {
            try {
                const response = await API.get('/auth/me', {
                    withCredentials: true
                });
                set({user: response.data.user})
            } catch {
                set({ user: null }); // Safely fails if cookie expired/absent
            }
        },
        registerUser: async (userData) => {
            const response = await API.post('/auth/register', userData, {
                withCredentials: false
            })

            return response;

        }
        
    }))


export default useAuthStore;