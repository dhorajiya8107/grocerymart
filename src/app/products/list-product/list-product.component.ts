import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {

  products: any;
  displayColumns: string[] = ['ProductName','ProductDescription','Price','Quantity','ManifacturedAt','ExpireAt','Actions'];

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

  manufacturedDate(date){
    return date.split('T')[0];
  }

  expireDate(date){
    return date.split('T')[0];
  }
}
