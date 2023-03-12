import mongoose from "mongoose"
import config from "./config"

mongoose.set('strictQuery', false)

const connectDB = async():Promise<void> =>{
    try{
        const db = await mongoose.connect(config.connectionString);
        //mongoose.connection;
        console.log("we are connected to mongoDB");
    }catch(err:any){
        console.log(err);
    }
}

export default connectDB;