import mongoose from "mongoose"

const requestRealizationSchema = mongoose.Schema({
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
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    completionTime: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
    },
    statusInfo: {
        type: Number,
        required: true,
        default: 0
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamp: true})

const RequestRealization = mongoose.model('RequestRealization', requestRealizationSchema);

export default RequestRealization;