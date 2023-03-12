import { ShoppingRoutingModule } from './shopping-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartItemCardComponent } from './components/cart-item-card/cart-item-card.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './components/order/order.component';
import { OrderItemsComponent } from './components/order/order-items/order-items.component';
import { OrderDetailsComponent } from './components/order/order-details/order-details.component';
import { OrderPopupComponent } from './components/order/order-popup/order-popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import { ProductPopupComponent } from './components/product-popup/product-popup.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    ProductCardComponent,
    CartItemCardComponent,
    AdminPageComponent,
    OrderComponent,
    OrderItemsComponent,
    OrderDetailsComponent,
    OrderPopupComponent,
    ProductPopupComponent,
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule
  ]
})
export class ShoppingModule { }
