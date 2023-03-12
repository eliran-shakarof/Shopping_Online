import { appConfig } from './../../utils/app-config';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cart } from './../../models/cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  header = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization" : '3232'});

  get cart$() {
    return this.cartSubject.asObservable();
  }

  setJwt() {
    const token = localStorage.getItem('token');
    if(token !== null){
    this.header = this.header.set('Authorization', JSON.parse(token));
    }
  }

  checkForCart(userId:string):Observable<any>{
    this.setJwt();
    return this.HttpClient.get<any[]>(`${appConfig.checkForCartUrl}/${userId}`,{headers:this.header});
  }

  setCartSubject(cart:Cart | null){
    if (!cart) {
      localStorage.clear();
      return;
    }
    this.cartSubject.next(cart);
  }

  constructor(private HttpClient: HttpClient) {}
}
