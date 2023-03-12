import { Document,model,Schema } from "mongoose";

export interface ICategoryModel extends Document{
    name:string;   
}

const CategorySchema = new Schema<ICategoryModel>({
    name:{
        type:String,
        required: [true,"missing product name"],
        minlength: [2,"product name is too short"],
        maxlength: [20,"product name is too long"],
        trim: true,
    },
},{
    versionKey: false
});


const CategoryModel = model<ICategoryModel>("categories",CategorySchema);
export default CategoryModel;