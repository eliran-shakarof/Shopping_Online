import OrderModel, { IOrderModel } from './../Models/orderModel';
import { ClientError } from "../Models/client-errors";
import cartLogic from './cartLogic';

const getOrdersByUserId = async(userId: string): Promise<IOrderModel[]> =>{
    return await OrderModel.find({userId: userId});   
}
// deliveryDate: { $gte: today } 
const getAllOrderDates = async(): Promise<string[]> =>{
    const today = new Date();
    const orders = await OrderModel.find({}, { deliveryDate: 1, _id: 0 });
    const deliveryDates = orders.map((order) => order.deliveryDate.toISOString());
    return deliveryDates;
}

const makeOrder = async(order: IOrderModel): Promise<IOrderModel> =>{
    const alreadyOrdered = await OrderModel.findOne({cartId: order.cartId});
    if(alreadyOrdered === null){
        const errors = new OrderModel(order).validateSync();
        if(errors) throw new ClientError(400,errors.message);

        await cartLogic.setCartOrdered((order.cartId).toString());
        return await new OrderModel(order).save();
    }else{
        throw new ClientError(400,`The cart have been ordered..`);
    }
}

export default{
    getOrdersByUserId,
    getAllOrderDates,
    makeOrder
}