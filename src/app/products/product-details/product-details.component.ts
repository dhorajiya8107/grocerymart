import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  currentYear: number;

facebook(url) {
  // window.location = "https://www.facebook.com";
  window.open(url, '_blank', 'noopener,noreferrer');
}

  id:any;
  productRes:any;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public http: HttpClient,
    public productService: ProductService,
    public snackBar: MatSnackBar,
    public cartService: CartService
  ){
    this.currentYear = new Date().getFullYear();
  }

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
    const baseUrl = 'http://192.168.29.144:8010/';
    return baseUrl + imagePath;
  }

  manuDate(date){
    return date.split('T')[0];
  }

  expireDate(date){
    return date.split('T')[0];  
  }

  addToCart(product){

    let userData = JSON.parse(localStorage.getItem("user"));
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    product.UserId = userData.Userid;
    product.ProductQuantity = 1;
    product.TotalPrice = product.ProductQuantity * product.Price;

    if(product.Quantity == 0){
      this.displaySnackBar("Product is out of stock");
      return;
    }

    let productExists = cartData.some(data => data.UserId === product.UserId && data.ProductId === product.ProductId)

    if(productExists){
      this.displaySnackBar("Product already added to cart");
    }else{
      cartData.push(product);
      localStorage.setItem('cart', JSON.stringify(cartData));
      this.displaySnackBar("Product added to cart");
      // const currentUserCartData = cartData.filter(data => data.UserId === userData.Userid);
      const currentCount = this.cartService.getCurrentCartItemCount();
      const newCount = currentCount + 1;
      this.cartService.updateCartItemCount(newCount);
    }

  }
}
