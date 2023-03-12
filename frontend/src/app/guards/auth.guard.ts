import { AuthService } from './../core/services/auth.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree | any {

    this.authService.checkStorageUser().then(()=> {
      const result$ = this.authService.user$.pipe(map(isAuth=>{
        if(isAuth) return true;
        return this.router.parseUrl(`/login?redirectUrl=${route.url}`);
      }));

    return result$;
    });
  }
}
