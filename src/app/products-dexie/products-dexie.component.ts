import { Component } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { ProductModelComponent } from './product-model/product-model.component';
import { ProductsService } from './products.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-dexie',
  templateUrl: './products-dexie.component.html',
  styleUrls: ['./products-dexie.component.css']
})
export class ProductsDexieComponent {

  products: any[];
  displayColumns: string[] = ['name', 'price', 'quantity', 'manufacturedAt', 'expireAt', 'actions'];
  dataSource = new MatTableDataSource([]);
  allData:any[] = [];

  constructor(
    public dialog: MatDialog,
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.loadProducts();    
  }

  displaySnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    })
  }

  async loadProducts(): Promise<void> {
    this.dataSource.data = await this.productsService.getAllProducts();
    this.allData = this.dataSource.data;
  }

  openDialog(action: string, productId?: number){
    const dialogRef = this.dialog.open(ProductModelComponent, {
      data: { action: action, productId: productId },
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'added'){
        this.displaySnackBar("Product added successfully");
      }else if(result === 'updated'){
        this.displaySnackBar("Product updated successfully");
      }
      this.loadProducts();
    });
  }

  async deleteProduct(id: number): Promise<void>{
    await this.productsService.deleteProduct(id);
    this.loadProducts();
  }

  onSearch(searchText){
    this.dataSource.data = this.allData.filter((data) => 
      data.name.toLowerCase().includes(searchText.toLowerCase()) ||
      data.price.includes(searchText) ||
      data.quantity.includes(searchText) || 
      data.manufacturedAt.toLowerCase().includes(searchText.toLowerCase()) ||   
      data.ExpireAt.toLowerCase().includes(searchText.toLowerCase()) 
    )
  }

}