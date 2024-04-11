import { Component } from '@angular/core';
import { ProductService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: any;
  searchText = "";

  constructor(
    public productService: ProductService,
  ){}

  ngOnInit(){
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.products =  this.products.ServiceObject;
      this.products.reverse();
    })
  }

  getImageUrl(imagePath: string): string {
    const baseUrl = 'http://192.168.1.25:8010/';
    return baseUrl + imagePath;
  }
}
