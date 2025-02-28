import mongoose from "mongoose";

const Schema =mongoose.Schema;

const userSchema = new Schema ({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date().getTime()
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema);

export default User;