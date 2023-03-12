import { Document,model,Schema } from "mongoose";
import CartModel, { ICartModel } from './../Models/cartModel';
import { ClientError } from "../Models/client-errors";

const getAllCarts = async(): Promise<ICartModel[]> => {
    return await CartModel.find().populate("userId");
}

const getOpenCartForUser = async(userId: string): Promise<ICartModel> =>{
    const cart = await CartModel.findOne({userId: userId, hasOrder: false}).exec();
    if(!cart) throw new ClientError(404,`The user id ${userId} not found`);
    return cart;
}

const checkForCart = async(userId: string): Promise<ICartModel> =>{
    //check if the user have cart open
    const haveCart = await CartModel.findOne({userId: userId, hasOrder: false}).exec();
     if(!haveCart){
        const errors = new CartModel({userId: userId}).validateSync();
        if(errors) throw new ClientError(400,errors.message);
        return await new CartModel({userId: userId}).save();    
    }else{
        return haveCart;
    }

}

const setCartOrdered = async(cartId:string): Promise<ICartModel> =>{
    const updatedCart = await CartModel.findByIdAndUpdate(cartId,{hasOrder: true},{ new: true }).exec();
    if(!updatedCart) throw new ClientError(404,`_id of cart ${cartId} not found`);
    return updatedCart;
}

export default{
    getAllCarts,
    getOpenCartForUser,
    checkForCart,
    setCartOrdered
}

