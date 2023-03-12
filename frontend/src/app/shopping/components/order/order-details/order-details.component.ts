import { OrderPopupComponent } from './../order-popup/order-popup.component';
import { OrdersService } from './../../../../core/services/orders.service';
import { CartItemsService } from './../../../../core/services/cart-items.service';
import { Cart } from './../../../../models/cart';
import { CartService } from './../../../../core/services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from './../../../../models/order';
import { BehaviorSubject, combineLatest, debounceTime, map } from 'rxjs';
import { User } from 'src/app/models/user-model';
import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  user!: User;
  cart!:Cart;
  totalPrice!:number;

  isCityDirty!: boolean;
  citySearchSubject = new BehaviorSubject<string>('');
  cities: string[] = [];

  minDate!: string;
  datesList!: string[];
  order = new Order();


  infoForm: FormGroup = new FormGroup({
    userId: new FormControl(''),
    cartId: new FormControl(''),
    totalPrice: new FormControl(0),
    city: new FormControl('',[
      Validators.required,
      Validators.minLength(2),
      this.checkCity.bind(this)
    ]),
    street: new FormControl('',[
      Validators.required,
      Validators.minLength(2)
    ]),
    deliveryDate: new FormControl('',[
      Validators.required,
      this.checkDelivery.bind(this)
    ]),
    orderDate: new FormControl('',[
      Validators.required,
    ]),
    creditCard: new FormControl('',[
      Validators.required,
      Validators.maxLength(4),
      Validators.minLength(4),
    ]),
  });

  constructor(
              private authService:AuthService,
              private cartService:CartService,
              private cartItemsService:CartItemsService,
              private ordersService:OrdersService,
              public dialog: MatDialog,
              private toastr: ToastrService
              ){}

  ngOnInit(): void {
    combineLatest([
            this.citySearchSubject.pipe(debounceTime(300)),
            this.authService.getCities()
          ])
          .pipe(
            map(([searchCity,list]) =>
            list.filter((w:any, i:any) => w.includes(searchCity) && i !== 0)
            )
          )
          .subscribe((results:any) =>{this.cities = results})

          this.authService.user$.subscribe((res)=>{
            if(!res) return;
            this.user = res;
          });

          this.cartService.cart$.subscribe((res)=>{
            if(!res) return;
            this.cart = res;
          });

          this.cartItemsService.totalPrice$.subscribe((res)=>{
            if(!res) return;
            this.totalPrice = res;
          });

          this.ordersService.getAllDates().subscribe((res)=>{
            this.datesList = res;
            this.datesList = this.datesList.map(item => item = item.split('T')[0]);
          });

          const today = new Date().toISOString().split('T')[0];
          this.minDate = today;
  }

  async onSubmit(){
    this.infoForm.controls['userId'].setValue(this.user._id);
    this.infoForm.controls['cartId'].setValue(this.cart._id);
    this.infoForm.controls['orderDate'].setValue(this.cart.createdAt);
    this.infoForm.controls['totalPrice'].setValue(this.totalPrice);

    if(this.infoForm.valid){
      this.order = this.infoForm.value;
      this.ordersService.makeOrder(this.order).subscribe({
        next: (res) => {
          this.openDialog();
        },
        error: (err) =>{
          this.toastr.error("Some error is happen, please try again later", 'Error');
        }
      })
    }else{
        this.infoForm.markAllAsTouched();
    }
  }

  onValueChange(city:string){
    this.citySearchSubject.next(city);
    this.isCityDirty = city.length > 0;
  }

  chooseCity(city: string) {
    this.infoForm.patchValue({
      city,
    });
    this.isCityDirty = false;
  }

  checkCity(control: FormControl) {
    if (!this.cities) return { notExist: true };
    return this.cities.includes(control.value) ? null : { notExist: true };
  }

  checkDelivery(control: FormControl) {
    if(!this.datesList) return null;

    let occurrences = 0;
    this.datesList.map(date =>{
       (date === control.value) && occurrences++ ;
    });
    return occurrences === 3 ? { exist: true } : null;
  }

  fillCityValue(input: HTMLInputElement) {
    input.value = this.user.city;
    input.dispatchEvent(new Event('input'));
    this.infoForm.controls[input.name].markAsDirty();
  }

  fillStreetValue(input: HTMLInputElement) {
    input.value = this.user.street;
    input.dispatchEvent(new Event('input'));
    this.infoForm.controls[input.name].markAsDirty();
  }

  openDialog() {
    const dialogRef = this.dialog.open(OrderPopupComponent);
    dialogRef.afterClosed().subscribe()
  }
}

