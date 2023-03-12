import { Document,model,Schema } from "mongoose";

export interface ICartModel extends Document{
    userId: Schema.Types.ObjectId;
    createdAt: Date;
    hasOrder: boolean;
}

const cartSchema = new Schema<ICartModel>({
    userId:{
        type: Schema.Types.ObjectId,
        required: [true,"missing user id"],
        ref:"users"
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    hasOrder:{
        type: Boolean,
        default: false
    }
},{
    versionKey: false,
})

const CartModel = model<ICartModel>("carts", cartSchema);
export default CartModel;