import { ProductsService } from './../../../core/services/products.service';
import { User } from 'src/app/models/user-model';
import { AuthService } from './../../../core/services/auth.service';
import { CartService } from './../../../core/services/cart.service';
import { Product } from './../../../models/product';
import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ProductPopupComponent } from '../product-popup/product-popup.component';

export interface DialogData {
  product: Product;
  cardId: string;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

    @Input() public product!: Product;
    public imageSource!: string;
    public quantity!: number;
    public cartId!: string;
    public user!: User;

    constructor(private cartService: CartService,
                private authService: AuthService,
                private productsService: ProductsService,
                public dialog: MatDialog,
                ){}


    ngOnInit(): void {
       this.imageSource = this.product.image;

      this.cartService.cart$.subscribe(cart =>{
        if(!cart) return;
        this.cartId = cart?._id;
      })

      this.authService.user$.subscribe((res) => {
        if(!res) return;
        this.user = res;
      });
    }

    chooseProduct(){
      this.openDialog();
    }

    editProduct(){
      this.productsService.setProdEditSubject(this.product);
    }

    openDialog() {
      const dialogRef = this.dialog.open(ProductPopupComponent,{
        data: {product: this.product, cardId: this.cartId}
      });
      dialogRef.afterClosed().subscribe();
    }
}
