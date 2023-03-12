import { CartItemsService } from './../../../../core/services/cart-items.service';
import { CartService } from './../../../../core/services/cart.service';
import { AuthService } from './../../../../core/services/auth.service';
import { CartItem } from './../../../../models/cartItem';
import { Observable, BehaviorSubject, combineLatest, debounceTime, map } from 'rxjs';
import { User } from 'src/app/models/user-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
  user!: User;
  currCartItems$!: Observable<CartItem[]>;
  totalPrice$!: Observable<number>;
  productSearchTerm = '';

  constructor(
    private authService:AuthService,
    private cartService:CartService,
    private cartItemsService:CartItemsService,
    ){}

  ngOnInit(): void {
    this.authService.user$.subscribe((res) => {
      if(!res) return;
      this.user = res;

      this.cartService.checkForCart(this.user?._id).subscribe(
        (res) => {
          this.cartService.setCartSubject(res);
          this.cartItemsService.getAllCartItems(res._id).subscribe(
            (res) => {
              this.cartItemsService.setCartItems(res);
          });
      });
    });

    this.currCartItems$ = this.cartItemsService.cartItems$;
    this.totalPrice$ = this.cartItemsService.totalPrice$;

  }

  onValueChange(product:string){
    this.productSearchTerm = product.toLowerCase();
  }
}

