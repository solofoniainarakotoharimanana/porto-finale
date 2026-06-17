import Category from "../models/categoryModel.js";

export const fetchCategories = async (req, res) => {
    try {
        const categories = await Category.find({});

        return res.status(200).json({
            categories
        })
    } catch (error) {
        res.status(500).json({
            error: error.messager
        })
    }
}