import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ProductService } from 'src/app/services/products.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  productForm: FormGroup;
  // roleResponse: any;
  // roleDropDown:IDropdownSettings = {};
  errMsg: any = null;
  // isRoleInvalid: boolean = false;
  // btnClicked: boolean = false;
  // hidePassword: boolean = true;

  constructor(
    public formBuilder: FormBuilder,
    public http: HttpClient,
    public router: Router, 
    public snackBar: MatSnackBar,
    public productService: ProductService
  ){}

  ngOnInit(){
    this.productForm = this.formBuilder.group({
      ProductName: [null, Validators.required],
      ProductDescription: [null, Validators.required],
      Price: [null, Validators.required],
      BuckleNumber: [null, Validators.required],
      Quantity: [null, Validators.required],
      CategoryId: "7816629d-27d6-4128-a430-6ef7d6b5c14b",
      Image: [null, Validators.required],
      ManifacturedAt: [null, Validators.required],
      ExpireAt: [null, Validators.required]
    })
  }

  displaySnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    })
  }
 
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZeroes(date.getMonth() + 1);
    const day = this.padZeroes(date.getDate());
    
    return `${year}-${month}-${day}`;
  }

  padZeroes(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  OnFormSubmit(){
    if(!this.productForm.valid) return;
    
    this.productForm.value.Image = this.productForm.value.Image.name;
      
    const manifacturedAtDate = new Date(this.productForm.value.ManifacturedAt);
    const expiresAtDate = new Date(this.productForm.value.ExpireAt);
    this.productForm.value.ManifacturedAt = this.formatDate(manifacturedAtDate);
    this.productForm.value.ExpireAt = this.formatDate(expiresAtDate);

    console.log(this.productForm.value);
    
    this.productService.addProduct(this.productForm.value).subscribe({
      next: (res) => {
        console.log(res);   
        this.productForm.reset();
        this.displaySnackBar("Product added successfully");
      },
      error: (errMsg) => {
        this.errMsg = errMsg;
        setTimeout(() => {
          this.errMsg = null;
        }, 3000); 
        console.log(errMsg);
      }
    })
  }
}
