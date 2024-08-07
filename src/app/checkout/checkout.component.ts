import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  showCardPayment = false;
  paymentForm: FormGroup;
  upiForm: FormGroup;
  foodForm: FormGroup;
  showCOD = false;
  showCheckoutForm = false;
  showUPI = false;
  showfoodPayment = false;
  cartData:any = [];
  Userid:any;
  allData:any = [];
  currentYear: number;

  facebook(url) {
    // window.location = "https://www.facebook.com";
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  
  constructor(public router : Router,private fb: FormBuilder,public snackBar: MatSnackBar,
    public cartService: CartService,public productService: ProductService){
    this.paymentForm = this.fb.group({
      cardname: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expirymonth: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      expiryyear: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]]
    });

    this.foodForm = this.fb.group({
      cardname: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expirymonth: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      expiryyear: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]]
    });

    this.upiForm = this.fb.group({
      upiId: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/)]]
    });

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

  displaySnackBar(message){
    this.snackBar.open(message, 'Close', {
    duration: 3000,
    })
  }

  saveCart(){
    let existingCartData = JSON.parse(localStorage.getItem("cart"));
    localStorage.setItem('cart', JSON.stringify(this.allData || existingCartData));
  }

  validatecard(event: Event) {
    const cardname = this.paymentForm.get('cardname')?.value.trim();
    const cardNumber = this.paymentForm.get('cardNumber')?.value.trim();
    const expirymonth = this.paymentForm.get('expirymonth')?.value.trim();
    const expiryyear = this.paymentForm.get('expiryyear')?.value.trim();
    const checkbox = event.target as HTMLInputElement;

    if (cardname === '' || cardNumber === '' || expirymonth === '' || expiryyear === '') {
      alert('Please enter the card detail properly');
      checkbox.checked = false;
    }
  }

  validateupi(event: Event) {
    const upiId = this.upiForm.get('upiId')?.value.trim();
    const checkbox = event.target as HTMLInputElement;
  
    if (upiId === '') {
      alert('Please enter the UPI ID detail properly');
      checkbox.checked = false;
    }
  }

  validatefood(event: Event) {
    const cardname = this.foodForm.get('cardname')?.value.trim();
    const cardNumber = this.foodForm.get('cardNumber')?.value.trim();
    const expirymonth = this.foodForm.get('expirymonth')?.value.trim();
    const expiryyear = this.foodForm.get('expiryyear')?.value.trim();
    const checkbox = event.target as HTMLInputElement;

    if (cardname === '' || cardNumber === '' || expirymonth === '' || expiryyear === '') {
      alert('Please enter the food card detail properly');
      checkbox.checked = false;
    }
  }

  checkout(){
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
      const newCount = 0;
      this.cartService.updateCartItemCount(newCount);
      this.router.navigate(['/home']);
    },
    error: (errMsg) => {
      console.log(errMsg);
    }
    })
  }

  displayCardPayment() {
    this.showCardPayment = true;
    this.showCOD = false;
    this.showUPI = false;
    this.showfoodPayment = false;
    this.showCheckoutForm = true;
    var text = document.getElementById("textField");
    text.style.display = "block";
  }

  displayUPI() {
    this.showCardPayment = false;
    this.showCOD = false;
    this.showUPI = true;
    this.showfoodPayment = false;
    this.showCheckoutForm = true;
    var text = document.getElementById("Field");
    text.style.display = "block";
  }

  displayCOD() {
    this.showCardPayment = false;
    this.showCOD = true;
    this.showUPI = false;
    this.showfoodPayment = false;
    this.showCheckoutForm = true;
    var text = document.getElementById("COD");
    text.style.display = "block";
  }

  displayFoodPayment() {
    this.showCardPayment = false;
    this.showCOD = false;
    this.showUPI = false;
    this.showfoodPayment = true;
    this.showCheckoutForm = true;
    var text = document.getElementById("food");
    text.style.display = "block";
    }

    getTotalOrder(){
      let totalOrder = 0;
      this.cartData.forEach(product => {
        totalOrder += product.TotalPrice
      });
      return totalOrder;
    }
}