import Role from "./role";

export interface IUser {
  _id: string;
  identity_card:string;
  first_name:string;
  last_name:string;
  email:string;
  password:string;
  city: string;
  street: string;
  role: Role;
}

export class User implements IUser {
  _id: string = "";
  identity_card:string = "";
  first_name:string = "";
  last_name:string = "";
  email:string = "";
  password:string = "";
  city: string = "";
  street: string = "";
  role: Role = Role.Guest;
}


