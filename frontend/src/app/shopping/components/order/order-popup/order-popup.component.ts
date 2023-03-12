import { Router } from '@angular/router';
import { Cart } from './../../../../models/cart';
import { User } from './../../../../models/user-model';
import { CartItemsService } from './../../../../core/services/cart-items.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.css']
})
export class OrderPopupComponent implements OnInit{
  user!: User;
  cart!:Cart;
  totalPrice!:number;
  sub!: Subscription;

  constructor(
    private cartItemsService:CartItemsService,
    private router:Router
    ){}

  ngOnInit(): void {
    this.cartItemsService.totalPrice$.subscribe((res)=>{
      if(!res) return;
      this.totalPrice = res;
    });
  }

  generateFileContent(data: any[]): string {
    let content = '';
    for (let item of data) {
      content += item.productId.name +'\t'+' X '+
                 item.quantity +'\t'+' = '+
                 item.totalPrice + '\n';
    }
    content += 'Total Price:' + this.totalPrice;
    return content;
  }

  dynamicDownloadTxt(){
    this.sub = this.cartItemsService.cartItems$.subscribe((res)=>{
               this.dynamicDownloadByHtmlTag({
               fileName:'Receipt',
               text: this.generateFileContent(res),
            })
    })
  }

  private setting = {
    element: {
      dynamicDownload: null as unknown as HTMLElement,
    },
  }

  private dynamicDownloadByHtmlTag(arg: {fileName: string; text:string}){
    if(!this.setting.element.dynamicDownload){
      this.setting.element.dynamicDownload = document.createElement('a');
    }

    const element = this.setting.element.dynamicDownload;
    const fileType = 'text/plain';
    element.setAttribute(
      'href',
      `data:${fileType};chatset=utf-8,${encodeURIComponent(arg.text)}`
    );

    element.setAttribute('download',arg.fileName);
    var event = new MouseEvent('click');
    element.dispatchEvent(event);
  }

  endSession(){
    this.router.navigate(['/shopping']);
    this.sub?.unsubscribe();
  }
}
