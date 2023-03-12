import dotenv from "dotenv";
dotenv.config();

// Configuration
class Config { 
    public port = process.env.PORT ? +process.env.PORT : 3200; 
    public userName = process.env.MONGO_USERNAME || "";
    public userPassword = process.env.MONGO_PASSWORD || "";
    
    public connectionString = `mongodb+srv://${this.userName}:${this.userPassword}@cluster0.ubm777d.mongodb.net/ShoppingOnline`;
}


const config = new Config();
export default config
