import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  id:any;
  productRes:any;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public http: HttpClient,
    public productService: ProductService
  ){}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    
    this.productService.getProductById(this.id).subscribe((res) => {
      this.productRes = res;
      console.log(this.productRes);
    }) 
  }

  getImageUrl(imagePath){
    const baseUrl = 'http://192.168.1.25:8010/';
    return baseUrl + imagePath;
  }

  manuDate(date){
    return date.split('T')[0];
  }

  expireDate(date){
    return date.split('T')[0];  
  }

  addToCart(product){
    var cartData = JSON.parse(localStorage.getItem("cart")) || [];
    cartData.push(product);
    localStorage.setItem('cart', JSON.stringify(cartData));
  }
}
