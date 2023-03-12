import { Observable, BehaviorSubject } from 'rxjs';
import { appConfig } from './../../utils/app-config';
import { Category } from './../../models/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  header = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization" : '3232'});
  private categoriesSubject$ = new BehaviorSubject<Category[]|null>([])
  isFilterd: boolean = false;

  get categories$(){
    return this.categoriesSubject$.asObservable()
  }

  setJwt() {
    const token = localStorage.getItem('token');
    if(token !== null){
    this.header = this.header.set('Authorization', JSON.parse(token));
    }
  }

  getAllCategories(): Observable<Category[]>{
    this.setJwt();
    return this.HttpClient.get<Category[]>(`${appConfig.getAllCategoriesUrl}`,{headers:this.header});
  }


  setCategoriesSubject(categories: Category[] | null) {
    this.categoriesSubject$.next(categories);
  }


  constructor(private HttpClient:HttpClient) { }
}
