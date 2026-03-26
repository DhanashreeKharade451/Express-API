import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

async function connectDB() {

    try{
        await mongoose.connect(uri);
        consol.log("MongoDB connected")
    }catch(err){
        console.log(err)
    }
    
}

connectDB();;