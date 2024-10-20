import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    apiKey: {
        type: String,
        required: true,
        unique: true
    },
    rateLimit:{
        type: Number,
        default: 100 //100 requests per hour
    }

});

const User = mongoose.model("User", userSchema);
export default User;