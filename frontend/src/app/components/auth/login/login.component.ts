import { OrdersService } from './../../../core/services/orders.service';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  productsCount!: number;
  ordersCount!: number;
  imgSrc!: string;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("",[
      Validators.required,Validators.email
    ]),
    password: new FormControl("",[
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(private router: Router,
              private toastr: ToastrService,
              private authService:AuthService,
              private productService: ProductsService,
              private orderService: OrdersService
              ){}

  ngOnInit(): void {
    this.imgSrc = "assets/images/main-photo.jpg";
    this.productService.getAllProducts().subscribe(res=>{
      this.productsCount = res.length;
    });

    this.orderService.getAllDates().subscribe(res=>{
      this.ordersCount = res.length;
    });
  }

  async send(){
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) =>{
          this.authService.setUserSubject(response.headers.get("Authorization"));
          this.toastr.success('Welcome ','Success');
          this.router.navigate(['/shopping']);
        },
        error: (err) =>{
          this.toastr.error("Email or password is incorrect", 'Error');
        }
      });
  }

}
