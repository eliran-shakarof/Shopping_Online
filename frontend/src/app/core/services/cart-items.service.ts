import { appConfig } from './../../utils/app-config';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from './../../models/cartItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CartItemsService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private totalPrice = new BehaviorSubject<number>(0);
  header = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization" : '3232'});

  get cartItems$(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  get totalPrice$(): Observable<number> {
    return this.totalPrice.asObservable();
  }

  setJwt() {
    const token = localStorage.getItem('token');
    if(token !== null){
    this.header = this.header.set('Authorization', JSON.parse(token));
    }
  }


  getAllCartItems(cartId: string):Observable<any>{
    this.setJwt();
    return this.HttpClient.get<any[]>(`${appConfig.getAllCartItemsUrl}/${cartId}`,{headers:this.header});
  }


  addItemToCart(cartItem:CartItem) {
    this.setJwt();
    const sub = this.HttpClient.post<any[]>(`${appConfig.addItemToCartUrl}`,cartItem,{headers:this.header,observe:'response'})
    .subscribe(res=>this.setCartItems(res.body));
  }

  deleteItemFromCart(cartItemId:string): Observable<any>{
    this.setJwt();
    const sub = this.HttpClient.delete<any[]>(`${appConfig.deleteItemFromCartUrl}/${cartItemId}`,{headers:this.header});
    const lastValue = this.cartItemsSubject.value;
    const newValue = lastValue.filter(item => item._id !== cartItemId);
    this.setCartItems(newValue);
    return sub;
  }

  deleteAllCartItems(cartId: string):Observable<any>{
    this.setJwt();
     const sub = this.HttpClient.delete<any[]>(`${appConfig.deleteAllCartItemsUrl}/${cartId}`,{headers:this.header});
     this.setCartItems([]);
     return sub;
  }

  setCartItems(cartItems: CartItem[] | null) {
    if (!cartItems) {
      localStorage.clear();
      return;
    }

    let total = 0;
    cartItems.map(item =>{
      total += item.totalPrice? item.totalPrice : 0 ;
    })

    this.cartItemsSubject.next(cartItems);
    this.totalPrice.next(total);
  }

  constructor(private HttpClient:HttpClient) { }
}
