export interface IProductModel{
  _id?:string;
  name: string;
  categoryId: string;
  price: number;
  image: string;
}


export class Product implements IProductModel{
  _id?:string = "";
  name: string = "";
  categoryId: string = "";
  price: number = 0;
  image: string = "";
}
