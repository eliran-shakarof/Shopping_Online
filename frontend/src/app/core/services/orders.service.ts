import { Order } from './../../models/order';
import { appConfig } from './../../utils/app-config';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  header = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization" : '3232'});

  setJwt() {
    const token = localStorage.getItem('token');
    if(token !== null){
    this.header = this.header.set('Authorization', JSON.parse(token));
    }
  }

  makeOrder(order: Order): Observable<any>{
    this.setJwt();
    return this.HttpClient.post<any[]>(`${appConfig.makeOrderUrl}`,order,{headers:this.header,observe:'response'});
  }

  getAllDates(): Observable<string[]>{
    this.setJwt();
    return this.HttpClient.get<string[]>(`${appConfig.getAllDatesUrl}`,{headers:this.header});
  }

  constructor(private HttpClient: HttpClient) {}
}
