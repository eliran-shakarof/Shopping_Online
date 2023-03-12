import { Router } from '@angular/router';
import { CartItemsService } from './../../../core/services/cart-items.service';
import { CartItem } from './../../../models/cartItem';
import { Observable, switchMap } from 'rxjs';
import { Cart } from './../../../models/cart';
import { CartService } from './../../../core/services/cart.service';
import { User } from './../../../models/user-model';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  user!: User;
  cart!: Cart;
  currCartItems$!: Observable<CartItem[]>;
  totalPrice$!: Observable<number>;
  fromCart: boolean = true;

  constructor(private authService: AuthService,
              private cartService: CartService,
              private cartItemsService: CartItemsService,
              private router:Router,
              private toastr: ToastrService
              ){}

  ngOnInit(): void {
    this.authService.user$.subscribe((res) => {
        if(!res) return;
        this.user = res;
    });

    this.cartService.checkForCart(this.user._id).subscribe(
      (res) => {
        this.cartService.setCartSubject(res);
        this.cart = res;
        this.cartItemsService.getAllCartItems(res._id).subscribe(
          (res) => {
            this.cartItemsService.setCartItems(res);
          });
    });

    this.currCartItems$ = this.cartItemsService.cartItems$;
    this.totalPrice$ = this.cartItemsService.totalPrice$;
  }

  clearCart(){
    this.cartItemsService.deleteAllCartItems(this.cart._id).subscribe(
      {
        error: (err) => this.toastr.error('Please try again later', 'Error')
      });
  }

  order(){
    this.router.navigate(['shopping/order']);
  }
}

