import { CategoriesService } from './categories.service';
import { appConfig } from './../../utils/app-config';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from './../../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private prodToEdit$ = new BehaviorSubject<Product | null>(null);
  private productListSubject$ = new BehaviorSubject<Product[]>([]);
  header = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization" : '3232'});

  get products$(): Observable<Product[]> {
    return this.productListSubject$.asObservable();
  }

  get prodEdit$(){
    return this.prodToEdit$.asObservable();
  }

  setJwt() {
    const token = localStorage.getItem('token');
    if(token !== null){
    this.header = this.header.set('Authorization', JSON.parse(token));
    }
  }


  getAllProducts(): Observable<any[]>{
    this.setJwt();
    return this.HttpClient.get<any[]>(`${appConfig.getAllProductsUrl}`,{headers:this.header});
  }

  getProductsByCategory(categoryId: string): Observable<any[]>{
    this.setJwt();
    return this.HttpClient.get<any[]>(`${appConfig.getProductByCategoryIdUrl}/${categoryId}`,{headers:this.header});
  }

  addNewProduct(product: Product):Observable<any>{
    this.setJwt();
     const sub = this.HttpClient.post<any>(`${appConfig.addProductUrl}`,product,{headers:this.header,observe:'response'});
    let lastValue:any = this.productListSubject$.value;
    if((this.categoriesService.isFilterd && lastValue.length && lastValue[0].categoryId._id === product.categoryId) || (!this.categoriesService.isFilterd)){
      lastValue.push(product);
    }
     this.setProductList(lastValue);
     return sub;
  }

  updateProduct(product: Product):Observable<any>{
    this.setJwt();
    const sub = this.HttpClient.put<any>(`${appConfig.updateProductUrl}`,product,{headers:this.header,observe:'response'});
    let lastValue = this.productListSubject$.value;
    let newValue = lastValue.filter(item => item._id !== product._id);
    newValue.push(product);
    this.setProductList(newValue);
    return sub;
  }

  setProdEditSubject(prod: Product | null) {
    this.prodToEdit$.next(prod);
  }

  setProductList(products: Product[] | null) {
    if (!products) {
      return;
    }
     this.productListSubject$.next(products);
  }

  constructor(private HttpClient:HttpClient,
              private categoriesService:CategoriesService
            ) { }
}
