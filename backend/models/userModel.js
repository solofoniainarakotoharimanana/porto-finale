import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: String,
        enum: ["user", "company"], 
        default: "user"
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,//16 charachers
            ref: "user",
            default: []
        }
    ],
    followings: [
        {
            type: mongoose.Schema.Types.ObjectId,//16 charachers
            ref: "user",
            default: []
        }
    ],
    profileImg: {
        type: String,
        default: ""
    },
    likedProject: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
}, { timestamp: true})

const User = mongoose.model("User", userSchema);

export default User;