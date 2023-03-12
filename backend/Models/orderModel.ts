import { Document,model,Schema } from "mongoose";
import CartItemModel from "./cartItemModel";

export interface IOrderModel extends Document{
    userId: Schema.Types.ObjectId;
    cartId: Schema.Types.ObjectId;
    totalPrice: number;
    city: string;
    street: string;
    deliveryDate: Date;
    orderDate: Date;
    creditCard: string;
}

const orderSchema = new Schema<IOrderModel>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required: [true,"missing user id"]
    },
    cartId:{
        type:Schema.Types.ObjectId,
        ref:"carts",
        required: [true,"missing cart id"]
    },
    totalPrice:{
        type:Number,
        required: [true,"missing cart id"]
    },
    city:{
        type:String,
        required: [true,"missing city"],
        minlength: [2,"city too short"]
    },
    street:{
        type:String,
        required: [true,"missing city"],
        minlength: [2,"city too short"]
    },
    deliveryDate:{
        type:Date,
        required: [true,"missing delivery date"],
    },
    orderDate:{
        type:Date,
        default: new Date(),
    },
    creditCard:{
        type: String,
        length: [4,"max 4 digits"],
        required: [true,"max 4 digits"],
    }
},{
    versionKey: false,
});

// orderSchema.pre('save', async function(next) {
//     try {
//       const items = await CartItemModel.find({cartId: this.cartId});
//       items.map((item)=>{
//          this.totalPrice += item.totalPrice
//       });
//       next();
//     } catch (err) {
//       next(err);
//     }
//   });

orderSchema.virtual("items",{
    ref:"cartsItems",
    localField: "cartId",
    foreignField: "cartId",
})

const OrderModel = model<IOrderModel>("orders", orderSchema);
export default OrderModel;