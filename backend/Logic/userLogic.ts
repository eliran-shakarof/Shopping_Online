import { IUserModel } from "../Models/userModel";
import UserModel from "../Models/userModel";
import { ClientError } from "../Models/client-errors";
import dotenv from "dotenv";
dotenv.config();


const getAll =  async(): Promise<IUserModel[]> => {
    return await UserModel.find().exec();
}

const getUserById =  async(identity_card: string): Promise<IUserModel> => {
    const user = await UserModel.findOne({identity_card: identity_card}).exec();
    if(!user) throw new ClientError(404,`identity card ${identity_card} not found`);
    return user;
}

const addUser = async(user:IUserModel): Promise<IUserModel> =>{
        const alreadyExists = await UserModel.findOne({$or: [{email: user.email},{identity_card: user.identity_card}]}).exec();
        if(alreadyExists) throw new ClientError(401,`id or email is already exists`)
        try{
            return await new UserModel(user).save();
        }
        catch(error){
            throw new ClientError(400,error.message);
        }
}

const updateUser = async(user: IUserModel): Promise<IUserModel> =>{
    const errors = new UserModel(user).validateSync();
    if(errors) throw new ClientError(400,errors.message);

    const updatedUser = await UserModel.findOneAndUpdate({identity_card: user.identity_card},user,{returnOriginal:false}).exec();
    if(!updatedUser) throw new ClientError(404,`identity card ${user.identity_card} not found`);
    return updatedUser;
}


const deleteUser = async (identity_card: string): Promise<void>=>{
    const userDelete = await UserModel.deleteOne({identity_card: identity_card}).exec();
    if(!userDelete.deletedCount) throw new ClientError(404,`id ${identity_card} not found`)
}



export default{
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getAll
}