import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    Description: {
        type: String,
        maxLength: 300
    },
    Email: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true,
        minLength: 8
    },
    Role: {
        type: String,
        enum: ["student", "educator"],
        required: true
    },
    PhotoURL: {
        type: String,
        default: ""
    },
    EnrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;