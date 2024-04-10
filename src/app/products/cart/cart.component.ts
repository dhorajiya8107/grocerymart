import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartData:any;

  ngOnInit(){
    var cartData = JSON.parse(localStorage.getItem("cart"));
    this.cartData = cartData;
  }

  getImageUrl(imagePath){
    const baseUrl = 'http://192.168.1.25:8010/';
    return baseUrl + imagePath;
  }
}
