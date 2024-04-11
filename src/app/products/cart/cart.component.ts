import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartData:any;
  Userid:any;
  allData:any;
  // orderRes:any;

  constructor(
    public productService: ProductService,
    public snackBar: MatSnackBar
  ){}

  ngOnInit(){
    var userData = JSON.parse(localStorage.getItem("user"));
    this.Userid = userData.Userid;
    var cartData = JSON.parse(localStorage.getItem("cart"));
    this.allData = cartData;
    this.cartData = cartData;
    this.cartData = this.cartData.filter((data) => data.UserId == userData.Userid);
    
    // this.productService.GetAllOrders().subscribe((res) => {
    //   this.orderRes = res;
    //   this.orderRes = this.orderRes.filter(order => order.orderObject.customerId === this.Userid);
    //   console.log(this.orderRes);
    // })
  }

  displaySnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    })
  }

  getImageUrl(imagePath){
    const baseUrl = 'http://192.168.1.25:8010/';
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
  }

  getTotalOrder(){
    let totalOrder = 0;
    this.cartData.forEach(product => {
      totalOrder += product.TotalPrice
    });
    return totalOrder;
  }

  checkOut(){
    let productDataList = this.cartData.map(product => ({
      ProductId: product.ProductId,
      Quantity: product.ProductQuantity
    }));

    let formatedData = {
      CustomerId: this.Userid,
      ProductDataList: productDataList
    };

    this.productService.AddOrder(formatedData).subscribe({
      next: (res) => {
        console.log(res);
        this.displaySnackBar("Order Successfull");
        this.allData = this.allData.filter(data => data.UserId !== this.Userid);
        this.saveCart();
        this.cartData = [];
      },
      error: (errMsg) => {
        console.log(errMsg);
      }
    })
  }
}