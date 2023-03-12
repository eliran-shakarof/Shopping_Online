import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Category } from './../../../../models/category';
import { CategoriesService } from './../../../../core/services/categories.service';
import { Observable, async, Subscription } from 'rxjs';
import { Product } from './../../../../models/product';
import { ProductsService } from './../../../../core/services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent implements OnInit,OnDestroy{
  prodEdit!: Observable<Product|null|any>;
  categories!: Observable<Category[]|null>
  addingProduct: Product = new Product();
  editFinalProd: Product = new Product();
  selected: boolean = false;
  private subscriptions = new Subscription();

  editForm : FormGroup = new FormGroup ({
    _id: new FormControl(''),
    name: new FormControl(''),
    categoryId: new FormControl(''),
    price: new FormControl(''),
    image: new FormControl(''),
  });


  constructor(private productsService:ProductsService,
              private categoriesService:CategoriesService,
              private toastr: ToastrService
              ){}


  ngOnInit(): void {
      this.prodEdit = this.productsService.prodEdit$;
      this.categories = this.categoriesService.categories$;

      this.subscriptions.add(
        this.prodEdit.subscribe(product => {
          this.editForm.controls['_id'].setValue(product?._id || '');
          this.editForm.controls['name'].setValue(product?.name || '');
          this.editForm.controls['categoryId'].setValue(product?.categoryId?._id || '');
          this.editForm.controls['price'].setValue(product?.price || '');
          this.editForm.controls['image'].setValue(product?.image || '');
      }));
  }

  selectAdding(){
    this.selected = !this.selected;
  }

  saveProductChanges(){
    this.editFinalProd = {...this.editForm.value};

    this.subscriptions.add(
      this.productsService.updateProduct(this.editFinalProd).subscribe({
        error: (err)=>{
          this.toastr.error(err.error, 'Error');
        }
    }));
  }

  addProduct(){
    delete this.addingProduct._id;
    this.subscriptions.add(
      this.productsService.addNewProduct(this.addingProduct).subscribe({
        error: (err)=>{
          this.toastr.error(err.error, 'Error');
        }
      })
    );
    this.addingProduct = new Product();
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
      this.productsService.setProdEditSubject(null);
      this.categoriesService.setCategoriesSubject(null);
  }
}
