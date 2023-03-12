export interface IOrderModel {
  userId: string;
  cartId: string;
  totalPrice: number;
  city: string;
  street: string;
  deliveryDate: Date;
  orderDate: Date;
  creditCard: string;
}

export class Order implements IOrderModel{
  userId: string = "";
  cartId: string = "";
  totalPrice: number = 0;
  city: string = "";
  street: string = "";
  deliveryDate: Date = new Date();
  orderDate: Date = new Date();
  creditCard: string = "";
}
