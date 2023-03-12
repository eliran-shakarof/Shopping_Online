export interface ICategoryModel {
  _id: string;
  name:string;
}

export class Category implements ICategoryModel{
    _id:string = "";
    name:string = "";
}
