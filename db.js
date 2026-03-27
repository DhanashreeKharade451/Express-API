import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const uri = process.env.MONGO_URI;

async function connectDB() {

    try{
        await mongoose.connect(uri);
        console.log("MongoDB connected")
    }catch(err){
        console.log(err)
    }
    
}

connectDB();