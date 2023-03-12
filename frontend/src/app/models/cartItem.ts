export interface ICartItemModel {
  _id?:string;
  productId: string;
  quantity: number;
  totalPrice?: number;
  cartId: string;
}

export class CartItem implements ICartItemModel{
  _id?: string = "";
  productId: string = "";
  quantity: number = 0;
  totalPrice?: number = 0;
  cartId: string = "";
}
