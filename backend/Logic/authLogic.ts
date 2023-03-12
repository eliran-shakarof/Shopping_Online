import { UserCred } from './../Models/userCred';
import { IUserModel } from "../Models/userModel";
import UserModel from "../Models/userModel";
import { ClientError } from "../Models/client-errors";
import dotenv from "dotenv";
import cryptoHelper from "../Utils/crypto-helper";
import jwtHelper from "../Utils/jwt-helper";
dotenv.config();

const register = async(newUser:IUserModel): Promise<string> =>{
    const alreadyIDExists = await UserModel.findOne({identity_card: newUser.identity_card}).exec();
    if(alreadyIDExists) throw new ClientError(400,`Identity card is already exists`)

    const alreadyEmailExists = await UserModel.findOne({email: newUser.email}).exec();
    if(alreadyEmailExists) throw new ClientError(400,`Email is already exists`)
    try{
        newUser.password = cryptoHelper.hash(newUser.password);
        await new UserModel(newUser).save();
        delete newUser.password;

        const token = jwtHelper.getNewToken(newUser);
        return token;
    }
    catch(error){
        throw new ClientError(400,error.message);
    }
}

const login = async(userCred: UserCred): Promise<string> =>{
    userCred.password = cryptoHelper.hash(userCred.password);
    const user = await UserModel.findOne({$and: [{email: userCred.email},{password: userCred.password}]},{password:0});
    if(!user){
         throw new ClientError(401,"Incorrect User name or password.");
    }else{
        const token = jwtHelper.getNewToken(user);
        return token;
    }
}

const relogUser = async (token:string) : Promise<string> =>{
    const oldUser: IUserModel = jwtHelper.getUserFromToken(token);
    const user = await UserModel.findOne({email: oldUser.email},{password:0});

    if(!user){
        throw new ClientError(401,"Some error with your user, please login again.");
   }else{
       const token = jwtHelper.getNewToken(user);
       return token;
   }
}

export default{
    register,
    login,
    relogUser,
}