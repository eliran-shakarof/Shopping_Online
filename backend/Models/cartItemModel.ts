import { Document,model,Schema } from "mongoose";
import ProductModel from "./productModel"

export interface ICartItemModel extends Document{
    productId: Schema.Types.ObjectId;
    quantity: number;
    totalPrice: number;
    cartId: Schema.Types.ObjectId;
}

const cartItemSchema = new Schema<ICartItemModel>({
    productId:{
        type:Schema.Types.ObjectId,
        ref:"products",
        required: [true,"missing product id"]
    },
    quantity:{
        type:Number,
        required: [true,"missing quantity"]
    },
    totalPrice:{
        type:Number
    },
    cartId:{
        type:Schema.Types.ObjectId,
        ref:"carts",
        required: [true,"missing cart id"],
    }
},{
    versionKey: false,
});

cartItemSchema.pre('save', async function(next) {
    try {
      const product = await ProductModel.findById(this.productId);
      this.totalPrice = product.price * this.quantity;
      next();
    } catch (err) {
      next(err);
    }
  });

  const CartItemModel = model<ICartItemModel>("cartsItems", cartItemSchema);
  export default CartItemModel;