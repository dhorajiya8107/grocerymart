import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public productService: ProductService,
    public snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.productService.getProductById(this.id).subscribe((res) => {
      this.productRes = res;
    }) 
  }

  displaySnackBar(message){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
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
    console.log(product);
    
    let userData = JSON.parse(localStorage.getItem("user"));
    product.UserId = userData.Userid;
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    product.ProductQuantity = 1;
    product.TotalPrice = product.ProductQuantity * product.Price;

    if(product.Quantity == 0){
      this.displaySnackBar("Product is out of stock");
      return;
    }
    cartData.forEach(data => {
      if(data.UserId == product.UserId && data.ProductId == product.ProductId){
        this.displaySnackBar("Product already added to cart");
        return;
      }else{
        cartData.push(product);
        localStorage.setItem('cart', JSON.stringify(cartData));
        this.displaySnackBar("Product added to cart");
      }     
    });
  }
}
