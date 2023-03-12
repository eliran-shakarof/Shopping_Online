import { Observable, BehaviorSubject, combineLatest, debounceTime, map } from 'rxjs';
import { CartService } from './../../../core/services/cart.service';
import { AuthService } from './../../../core/services/auth.service';
import { Cart } from './../../../models/cart';
import { Product } from './../../../models/product';
import { ProductsService } from './../../../core/services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  cart!: Cart;
  productSearchSubject = new BehaviorSubject<string>('');
  filteredProducts$!: Observable<Product[]>;


  constructor(private productService:ProductsService,
              private cartService:CartService,

              ){}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(result=>{
      this.productService.setProductList(result);
    })

    this.cartService.cart$.subscribe(result=> {
      if (!result) return;
      this.cart = result;
    })

    this.filteredProducts$ = combineLatest([
      this.productSearchSubject.pipe(debounceTime(300)),
      this.productService.products$
      ]).pipe(
      map(([searchProduct, list]) =>
        list.filter((item: any) =>
          item.name.toLowerCase().includes(searchProduct)
        )
      )
    );
  }

  onValueChange(product:string){
    this.productSearchSubject.next(product.toLowerCase());
  }
}
