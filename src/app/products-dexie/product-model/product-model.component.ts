import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProductsService } from '../products.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-model',
  templateUrl: './product-model.component.html',
  styleUrls: ['./product-model.component.css']
})
export class ProductModelComponent {
  productForm: FormGroup;
  action: string;
  productId: number;

  constructor(
    public formBuilder: FormBuilder,
    public datePipe: DatePipe,
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<ProductModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(){

    this.action = this.data.action;
    this.productId = this.data.productId;

    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
      manufacturedAt: [null, Validators.required],
      ExpireAt: [null, Validators.required],
    });

    if(this.action === 'edit'){
      this.loadProductDetails();
    }
  }

  async loadProductDetails(): Promise<void> {
    const product: any = await this.productsService.getProductById(this.productId);

    if(product){
      this.productForm.patchValue({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        manufacturedAt: new Date(product.manufacturedAt),
        ExpireAt: new Date(product.ExpireAt),

      });
    }
  }

  async OnFormSubmit(): Promise<void>{
    if(!this.productForm.valid) return;

    this.productForm.value.manufacturedAt = this.datePipe.transform(this.productForm.value.manufacturedAt, 'mediumDate');
    this.productForm.value.ExpireAt = this.datePipe.transform(this.productForm.value.ExpireAt, 'mediumDate');

    if(this.action === 'add'){
      await this.productsService.addProduct(this.productForm.value);
    }else if(this.action === 'edit'){
      await this.productsService.updateProduct(this.productId, this.productForm.value);
    }

    this.dialogRef.close(this.action === 'add' ? 'added' : 'updated');
    
  }
}