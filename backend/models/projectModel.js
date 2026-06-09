import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "User", 
		required: true
	},
	fileDescription: {
		type: String,
		default: ""
	},
	status: {
	 	type: String,
	 	required: true,
		enum: ["created", "in progress", "finish"],
		default: "created"
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: true
	},
    likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	comments: [
		{
			text: {
				type: String,
				required: true,
			},
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		},
	],
}, { timestamp: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;