import { User } from './../../../models/user-model';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!:User;
  haveAccount!: boolean;
  imgSource!: string;
  constructor(private authService:AuthService,
              private router: Router
              ){}

  ngOnInit(): void {
    this.imgSource = "assets/images/so-logo2.png";

    this.haveAccount = false;
    this.authService.user$.subscribe(user => {
      if(!user) return;
      this.user = user;
      this.user.first_name = this.user.first_name.charAt(0).toUpperCase() + this.user.first_name.slice(1);
      this.haveAccount = true;
    });
  }

  logout(){
    this.authService.logout();
    this.haveAccount = false;
  }
}
