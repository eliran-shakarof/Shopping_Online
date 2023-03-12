import { User } from 'src/app/models/user-model';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  user!:User;
  redirectUrl: string = '';

  constructor(){}

  ngOnInit(): void {}
}
