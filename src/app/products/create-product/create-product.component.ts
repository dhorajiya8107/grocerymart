import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/products.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  productForm: FormGroup;
  errMsg: any = null;
  catResponse: any;
  isEditMode: boolean = false;
  id:any;
  productRes:any;
  image:any;
  File:any = {};

  constructor(
    public formBuilder: FormBuilder,
    public http: HttpClient,
    public router: Router, 
    public snackBar: MatSnackBar,
    public productService: ProductService,
    public route: ActivatedRoute,
  ){}

  ngOnInit(){
    this.productForm = this.formBuilder.group({
      ProductName: [null, Validators.required],
      ProductDescription: [null, Validators.required],
      Price: [null, Validators.required],
      BuckleNumber: [null, [Validators.required, Validators.minLength(6)]],
      Quantity: [null, Validators.required],
      CategoryId: [null, Validators.required],
      Image: [null, Validators.required],
      ManifacturedAt: [null, Validators.required],
      ExpireAt: [null, Validators.required],
      ProductId: [null]
    })

    this.productService.getAllCategories().subscribe((res) => {
      this.catResponse = res; 
    })

    this.id = this.route.snapshot.paramMap.get('id');

    if(this.id){
      this.isEditMode = true;
      this.productService.getProductById(this.id).subscribe((res) => {
        this.productRes = res[0];
        this.File = this.productRes.Image.split('\\')[2];

        let fileType = this.getFileType(this.productRes.Image);
        
        let blob = new Blob([]);
        let file = new File([blob], this.File, { type: fileType});

        this.productForm.patchValue({
          ProductName: this.productRes.ProductName,
          ProductDescription: this.productRes.ProductDescription,
          Price: this.productRes.Price,
          BuckleNumber: this.productRes.BuckleNumber,
          Quantity: this.productRes.Quantity,
          CategoryId: this.productRes.CategoryId,
          Image: file,
          ManifacturedAt: new Date(this.productRes.ManifacturedAt),
          ExpireAt: new Date(this.productRes.ExpireAt),
          ProductId: this.productRes.ProductId
        });

      })
    }
  }

  getFileType(fileName) {
    let extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'webp':
        return 'image/webp';
      default:
        return 'application/octet-stream';
    }
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

    if(this.isEditMode == false){
      console.log(this.isEditMode);
      if(!this.productForm.valid) return;

      const manifacturedAtDate = new Date(this.productForm.value.ManifacturedAt);
      const expiresAtDate = new Date(this.productForm.value.ExpireAt);
      this.productForm.value.ManifacturedAt = this.formatDate(manifacturedAtDate);
      this.productForm.value.ExpireAt = this.formatDate(expiresAtDate);
      
      const formData = new FormData();
      formData.append('ProductName', this.productForm.value.ProductName);
      formData.append('ProductDescription', this.productForm.value.ProductDescription);
      formData.append('Price', this.productForm.value.Price);
      formData.append('BuckleNumber', this.productForm.value.BuckleNumber);
      formData.append('Quantity', this.productForm.value.Quantity);
      formData.append('CategoryId', this.productForm.value.CategoryId);
      formData.append('Image', this.productForm.value.Image);
      formData.append('ManifacturedAt', this.productForm.value.ManifacturedAt);
      formData.append('ExpireAt', this.productForm.value.ExpireAt);
      
      this.productService.addProduct(formData).subscribe({
        next: (res) => { 
          console.log(res);    
          this.productForm.reset();
          this.router.navigate(['/products']);
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

    }else{
      if(!this.productForm.valid) return;

      const manifacturedAtDate = new Date(this.productForm.value.ManifacturedAt);
      const expiresAtDate = new Date(this.productForm.value.ExpireAt);
      this.productForm.value.ManifacturedAt = this.formatDate(manifacturedAtDate);
      this.productForm.value.ExpireAt = this.formatDate(expiresAtDate);
      
      const formData = new FormData();
      formData.append('ProductId', this.productForm.value.ProductId);
      formData.append('ProductName', this.productForm.value.ProductName);
      formData.append('ProductDescription', this.productForm.value.ProductDescription);
      formData.append('Price', this.productForm.value.Price);
      formData.append('BuckleNumber', this.productForm.value.BuckleNumber);
      formData.append('Quantity', this.productForm.value.Quantity);
      formData.append('CategoryId', this.productForm.value.CategoryId);
      formData.append('Image', this.productForm.value.Image);
      formData.append('ManifacturedAt', this.productForm.value.ManifacturedAt);
      formData.append('ExpireAt', this.productForm.value.ExpireAt);

      this.productService.updateProduct(formData).subscribe({
        next: (res) => {
          console.log(res);   
          this.productForm.reset();
          this.router.navigate(['/products']);
          this.displaySnackBar("Product updated successfully");
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
}
