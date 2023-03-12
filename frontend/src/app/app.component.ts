import { AuthService } from './core/services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  redirectUrl: string = '';
  constructor(private authService:AuthService,
             ){}

  ngOnInit(): void {
    this.authService.checkStorageUser().finally();
  }


  title = 'frontend';
}

