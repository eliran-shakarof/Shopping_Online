import { Observable } from 'rxjs';
import { User } from 'src/app/models/user-model';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  user!:User;

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.authService.user$.subscribe((res) => {
      if(!res) return;
      this.user = res;
    });
  }
}
