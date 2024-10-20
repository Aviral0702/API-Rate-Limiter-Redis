import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        if(!connectionInstance){
            console.error("Connection to the database failed");
            process.exit(1);
        }
        console.log("Database connected successfully");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectDB;
