import { create } from "zustand";
import API from "../utils/api";

const BASE_URL = "http://localhost:5000/api"


const useCategoryStore = create(
    (set) => ({
        categories: null,
        fetchCategories: async () => {
            const response = await API.get(`${BASE_URL}/category/all`);
            set({
                categories: response.data.categories
            })

            return response.data.categories;
        }
    })
)

export default useCategoryStore;