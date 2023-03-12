import { Document,model,Schema } from "mongoose";
import Role from "./role";


export interface IUserModel extends Document{
    identity_card:string;
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    city: string;
    street: string;
    role: Role;
}

const UserSchema = new Schema<IUserModel>({
    identity_card:{
        type:String,
        required: [true,"missing id"],
        minlength: [0,"id is too short"],
        maxlength: [9,"id is too long"],
        trim: true,
        unique: true
    },
    first_name:{
        type:String,
        required: [true,"missing first name"],
        minlength: [2,"first name is too short"],
        maxlength: [20,"first name is too long"],
        trim: true,
    },
    last_name:{
        type:String,
        required: [true,"missing last name"],
        minlength: [2,"last name is too short"],
        maxlength: [20,"last name is too long"],
        trim: true,
    },
    email:{
        type:String,
        required: [true,"missing email"],
        match:[/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i,"invalid email"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "missing password"],
        minLength: [6, "password too short"],
        maxLength: [255, "password too long"],
    },
    city:{
        type:String,
        required: [true,"missing city"],
        minlength: [2,"city is too short"],
        maxlength: [20,"city is too long"],
        trim: true,
    },
    street:{
        type:String,
        required: [true,"missing street"],
        minlength: [2,"street is too short"],
        maxlength: [40,"street is too long"],
        trim: true,
    },
    role:{
        type:Number,
        required: [true,"missing role"],
        length: [1],
    },
},{
    versionKey: false,
});

const UserModel = model<IUserModel>("users",UserSchema);

export default UserModel;