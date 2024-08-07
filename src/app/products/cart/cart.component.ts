import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  
  showhidedetails = false;
  showshowdetails = false;
  cartData:any = [];
  Userid:any;
  allData:any = [];
  currentYear: number;

facebook(url) {
  // window.location = "https://www.facebook.com";
  window.open(url, '_blank', 'noopener,noreferrer');
}

  constructor(
    public productService: ProductService,
    public snackBar: MatSnackBar,
    public cartService: CartService,
    public router : Router
  ){
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(){
    var userData = JSON.parse(localStorage.getItem("user"));
    this.Userid = userData.Userid;
    var cartData = JSON.parse(localStorage.getItem("cart"));
    this.allData = cartData;
    this.cartData = cartData;
    this.cartData = this.cartData.filter((data) => data.UserId == userData.Userid);
  }

  displaySnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    })
  }

  getImageUrl(imagePath){
    const baseUrl = 'http://192.168.29.144:8010/';
    return baseUrl + imagePath;
  }

  updateQuantity(product, action){
    if(action == 'increment' && product.ProductQuantity < product.Quantity){
      product.ProductQuantity++;
    }
    else if(action == 'decrement' && product.ProductQuantity > 1){
      product.ProductQuantity--;
    }
    product.TotalPrice = product.Price * product.ProductQuantity;
    this.saveCart();
  }

  saveCart(){
    let existingCartData = JSON.parse(localStorage.getItem("cart"));
    localStorage.setItem('cart', JSON.stringify(this.allData || existingCartData));
  }

  removeProduct(productId){
    this.cartData = this.cartData.filter(product => (product.ProductId !== productId) || (product.UserId !== this.Userid));
    this.allData = this.allData.filter(product => (product.ProductId !== productId) || (product.UserId !== this.Userid));
    this.saveCart();
    const currentCount = this.cartService.getCurrentCartItemCount();
    const newCount = currentCount - 1;
    this.cartService.updateCartItemCount(newCount);
  }

  updateCartItemCount(): void {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItemCount = cartItems.length;
    localStorage.setItem('cartItemCount', cartItemCount.toString());
  }
  
  getTotalOrder(){
    let totalOrder = 0;
    this.cartData.forEach(product => {
      totalOrder += product.TotalPrice
    });
    return totalOrder;
  }

  getTotalItems(){
    let totalItems = 0;
    this.cartData.forEach(product => {
      totalItems += product.ProductQuantity
    });
    return totalItems;
  }

  checkOut() {
   this.displaySnackBar("Your Ordered has been Procced for Payments");
   this.router.navigate(['/checkout']);
  }
  
  continueshopping() {
    this.router.navigate(['/products']);
  }

  hidedetails() {
    this.showshowdetails = false;
  }

  showdetails() {
    this.showshowdetails = true;
  }
}