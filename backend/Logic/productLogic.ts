import { IProductModel } from "../Models/productModel";
import  ProductModel  from "../Models/productModel"
import { ClientError } from "../Models/client-errors";
import CartItemModel from "../Models/cartItemModel";

const getAllProducts = async(): Promise<IProductModel[]> => {
    return await ProductModel.find().populate("categoryId");
}

const getOneProduct = async(_id: string): Promise<IProductModel> =>{
    const product = await ProductModel.findById(_id).exec();
    if(!product) throw new ClientError(404,`_id ${_id} not found`);
    return product;
}

const getProductsByCategory = async(categoryId: string):Promise<IProductModel[]> =>{
    return await ProductModel.find({categoryId: categoryId}).populate("categoryId");
}

const addProduct = async(product:IProductModel): Promise<IProductModel> =>{
    const errors = new ProductModel(product).validateSync();
    if(errors) throw new ClientError(400,errors.message);
    return await new ProductModel(product).save();
}

const updateProduct = async(product: IProductModel): Promise<IProductModel> =>{
    const errors = new ProductModel(product).validateSync();
    if(errors) throw new ClientError(400,errors.message);

    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id,product,{returnOriginal:false}).exec();
    if(!updatedProduct) throw new ClientError(404,`_id ${product._id} not found`);

    // update the totalPrice field of each CartItemModel document
    const cartItems = await CartItemModel.find({ productId: updatedProduct._id });
    cartItems.map(async (cartItem) => {
    const totalPrice = updatedProduct.price * cartItem.quantity;
    await CartItemModel.findByIdAndUpdate(cartItem._id, { totalPrice });
    })
   
    return updatedProduct;
}


const deleteProduct = async (_id:string): Promise<void>=>{
    const productDelete = await ProductModel.findByIdAndDelete(_id).exec();
    if(!productDelete) throw new ClientError(404,`id ${_id} not found`)
}

export default{
    getAllProducts,
    getOneProduct,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct
}