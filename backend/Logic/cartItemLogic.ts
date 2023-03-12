import CartItemModel, { ICartItemModel } from './../Models/cartItemModel';
import { ClientError } from "../Models/client-errors";
import CartModel from '../Models/cartModel';
import ProductModel from '../Models/productModel';

const getCartItems = async(cartId:string): Promise<ICartItemModel[]> =>{
    return await CartItemModel.find({cartId: cartId}).populate("productId");
}


const addNewCartItem = async(cartItem: ICartItemModel): Promise<ICartItemModel[]> =>{
   const cart = await CartModel.findOne({_id: cartItem.cartId});
   if(cart != null && cart.hasOrder === false){
        let duplicateProduct = await CartItemModel.findOne({$and:[{cartId: cartItem.cartId},{productId: cartItem.productId}]}).exec();
        console.log(duplicateProduct);

        if (duplicateProduct !== null) {
            console.log(cartItem.cartId);
            const product = await ProductModel.findById(cartItem.productId);
            duplicateProduct.quantity += cartItem.quantity;
            duplicateProduct.totalPrice = product.price * duplicateProduct.quantity;
            await duplicateProduct.save();

        } else {      
          await new CartItemModel(cartItem).save();
        }
        return await CartItemModel.find({cartId: cartItem.cartId}).populate("productId");
   }else{
       throw new ClientError(400,`The cart are not available or invalid`);
   }
}

const deleteCartItem = async (_id:string): Promise<void> =>{
    const cartItemDelete = await CartItemModel.findByIdAndDelete(_id).exec();
    if(!cartItemDelete) throw new ClientError(404,`id ${_id} not found`)
}

const deleteAllCartItems = async(cartId: string): Promise<void> =>{
    const cartItemsDeleted = await CartItemModel.deleteMany({cartId: cartId});
    if(!cartItemsDeleted) throw new ClientError(404,`id ${cartId} not found`)
}

export default{
    getCartItems,
    addNewCartItem,
    deleteCartItem,
    deleteAllCartItems
}
