import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try{
        const connectInstace = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected \n DB HOST:${connectInstace.connection.host}`);
    } catch(error){
        console.log("MONGODB IS CONNECRION ERROR ", error);
        process.exit(1)
    }
    
}

export default connectDB