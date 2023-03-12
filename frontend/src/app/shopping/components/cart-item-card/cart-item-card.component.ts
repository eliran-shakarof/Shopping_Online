import { CartItemsService } from './../../../core/services/cart-items.service';
import { Observable } from 'rxjs';
import { CartItem } from './../../../models/cartItem';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.css']
})

export class CartItemCardComponent implements OnInit{
  @Input() public item!:CartItem | any;
  @Input() public fromCart? :boolean;
  @Input() public productSearchTerm?:string;
  
  constructor(private cartItemsService:CartItemsService){}

  ngOnInit(): void {
  }

  remove(){
    this.cartItemsService.deleteItemFromCart(this.item._id).subscribe();
  }
}
