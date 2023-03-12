import { ProductsService } from './../../../core/services/products.service';
import { Observable } from 'rxjs';
import { Category } from './../../../models/category';
import { CategoriesService } from './../../../core/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
  selectedCategoryId: string | null = null;
  categories!: Observable<Category[]|null>;
  isAllActive: boolean = true;

  constructor(private categoriesService:CategoriesService,
              private productService:ProductsService,
              ){}

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe(result=>{
        this.categoriesService.setCategoriesSubject(result);
    })

    this.categories = this.categoriesService.categories$;
  }

  allProducts(){
    this.selectedCategoryId = null;
    this.categoriesService.isFilterd = false;
    this.isAllActive = true;
    this.productService.getAllProducts().subscribe(result=>{
      this.productService.setProductList(result);
    })
  }

  categoryChoose(categoryId: string){
    this.categoriesService.isFilterd = true;
    this.isAllActive = false;
    this.selectedCategoryId = categoryId;
    this.productService.getProductsByCategory(categoryId).subscribe(
      res=>{
        this.productService.setProductList(res);
      })
  }
}
