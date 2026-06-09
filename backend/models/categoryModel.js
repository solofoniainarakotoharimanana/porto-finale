import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        enum: ["IT", "BTP", "COMMERCE", "ENVIRONMENT"]
    }
}, { timestamp: true })

const Category = mongoose.model("Category", categorySchema);

export default Category;

