export interface ICartModel{
  _id: string;
  userId: string;
  createdAt: Date;
  hasOrder: boolean;
}

export class Cart implements ICartModel{
  _id: string = "";
  userId: string = "";
  createdAt: Date = new Date();
  hasOrder: boolean = false;
}
