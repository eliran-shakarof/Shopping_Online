import { CartItem } from './../../../models/cartItem';
import { DialogData } from './../product-card/product-card.component';
import { CartItemsService } from './../../../core/services/cart-items.service';
import { Product } from './../../../models/product';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-product-popup',
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.css']
})

export class ProductPopupComponent implements OnInit{
  public imageSource!: string;
  public quantity!: number;

  constructor(
    public dialogRef: MatDialogRef<ProductPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cartItemsService: CartItemsService
  ) {}

  ngOnInit(): void {
    this.imageSource = this.data.product.image;
    this.quantity = 1;
  }

  addProd(){
    this.cartItemsService.addItemToCart({productId: this.data.product._id, quantity:this.quantity,cartId:this.data.cardId} as CartItem)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  increaseQty(){
    this.quantity++;
  }

  decreaseQty(){
    this.quantity--;
  }

  saveQty(event: any){
    if(event.target.value < 100){
      this.quantity = event.target.value;
    }
  }
}
