import { Component } from '@angular/core';
import { ProductService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: any;

  constructor(
    public productService: ProductService,
  ){}

  ngOnInit(){
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.products =  this.products.ServiceObject;
      console.log(this.products);
    })
  }
}
