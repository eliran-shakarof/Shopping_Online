import { Document,model,Schema } from "mongoose";
import  CategoryModel from "./categoryModel";
import CartItemModel from "./cartItemModel";

export interface IProductModel extends Document{
    name: string;   
    categoryId: Schema.Types.ObjectId;
    price: number;
    image: string;
}

const ProductSchema = new Schema<IProductModel>({
    name: {
        type:String,
        required: [true,"missing product name"],
        minlength: [2,"product name is too short"],
        maxlength: [40,"product name is too long"],
        trim: true,
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "categories"
    },
    price:{
        type: Number,
        required: [true,"missing product price"],
        min: [0,"price can not be negative"],
        max: [9999,"price can not be above 9999"]
    },
    image: {
        type:String,
        required: [true,"missing product image link"]
    }
},{
    versionKey:false,
    // toJSON:{virtuals:true},
    // id:false
});


const ProductModel = model<IProductModel>("products", ProductSchema);
export default ProductModel;