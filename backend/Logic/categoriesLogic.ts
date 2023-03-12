import { ICategoryModel } from './../Models/categoryModel';
import CategoryModel from './../Models/categoryModel';
import { ClientError } from "../Models/client-errors";

const getAllCategories = async(): Promise<ICategoryModel[]> =>{
    return await CategoryModel.find({}).sort({name: 1}).exec();
}

const addCategory = async(category: ICategoryModel): Promise<ICategoryModel> =>{
    const errors = new CategoryModel(category).validateSync();
    if(errors) throw new ClientError(400,errors.message);
    return await new CategoryModel(category).save();   
}

const updateCategory = async(category: ICategoryModel): Promise<ICategoryModel> =>{
    const errors = new CategoryModel(category).validateSync();
    if(errors) throw new ClientError(400,errors.message);

    const updatedCategory = await CategoryModel.findByIdAndUpdate(category._id,category,{returnOriginal:false}).exec();
    if(!updatedCategory) throw new ClientError(404,`_id ${category._id} not found`);
    return updatedCategory;
}


const deleteCategory = async (_id:string): Promise<void>=>{
    const categoryDelete = await CategoryModel.findByIdAndDelete(_id).exec();
    if(!categoryDelete) throw new ClientError(404,`id ${_id} not found`)
}

export default{
    getAllCategories,
    addCategory,   
    updateCategory,
    deleteCategory
}