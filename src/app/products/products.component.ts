import { Component } from '@angular/core';
import { ProductService } from '../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: any;
  searchText = "";
  allProducts:any;

  constructor(
    public productService: ProductService,
    public snackBar: MatSnackBar,
    public cartService: CartService
  ){}

  ngOnInit(){
    this.productService.getProducts().subscribe((res) => {
      this.allProducts = res;
      this.allProducts =  this.allProducts.ServiceObject;
      this.products = this.allProducts;
      this.products.reverse();
    })
  }

  getImageUrl(imagePath: string): string {
    const baseUrl = 'http://192.168.1.25:8010/';
    return baseUrl + imagePath;
  }

  onSearch(text) {
    this.products = this.allProducts.filter(data => data.ProductName.toLowerCase().includes(text.toLowerCase()));
  }

  displaySnackBar(message){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    })
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
      const currentCount = this.cartService.getCurrentCartItemCount();
      const newCount = currentCount + 1;
      this.cartService.updateCartItemCount(newCount);
    }

  }
}
