import { UserCred } from './../../models/userCred-model';
import { User } from './../../models/user-model';
import { appConfig } from './../../utils/app-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, firstValueFrom, map } from 'rxjs';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private user!: User;

  private userSubject = new BehaviorSubject<User | null>(null);
  header = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization" : '3232'});

  constructor(private HttpClient: HttpClient,
              private router: Router
              ) {}

  get user$() {
    return this.userSubject.asObservable();
  }

  setJwt(jwt: string) {
    this.header = this.header.set('Authorization', jwt);
  }

  register(newUser:User):Observable<any>{
    return this.HttpClient.post<any[]>(`${appConfig.registerUrl}`,newUser,{observe:'response'});
  }

  login(userCred: UserCred):Observable<any>{
   return this.HttpClient.post<any[]>(`${appConfig.loginUrl}`,userCred,{observe:'response'});
  }

  relog(token: string):Observable<any>{
    this.setJwt(token);
    return this.HttpClient.get<any[]>(`${appConfig.relogUrl}`,{headers:this.header,observe:'response'});
  }

  setUserSubject(token: string | null) {
    if(!token){
      localStorage.clear();
     return;
    }
    const decodedToken:any = jwtDecode(token);
    const user:User = decodedToken.user;

    if (!user) {
      return;
    }

    this.userSubject.next(user);
    this.user = user;
    localStorage.setItem('token', JSON.stringify(token));
  }

  checkStorageUser(): Promise<void> {
    const token = localStorage.getItem('token');
    if(token !== null){

      this.relog(JSON.parse(token)).subscribe(res=>{
        this.setUserSubject((res.headers.get("Authorization")))
      })
    }
    return Promise.resolve();
  }

  getCities() {
    return this.HttpClient.get<any>('https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1300')
      .pipe(
        map((list) => list.result.records.map((item:any) => item.שם_ישוב.trim()))
      );
  }

  getStreets(city: string) {
    return this.HttpClient.get<any>(`https://data.gov.il/api/3/action/datastore_search?resource_id=a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3&q=${city}&limit=1300`)
      .pipe(
        map((list) => list.result.records.map((item:any) => item.שם_רחוב.trim()))
      );
  }

  logout() {
    this.setUserSubject(null);
    this.router.navigate(['/login']);
  }
}
