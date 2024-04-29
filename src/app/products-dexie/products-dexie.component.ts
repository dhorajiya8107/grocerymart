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

@Component({
  selector: 'app-products-dexie',
  templateUrl: './products-dexie.component.html',
  styleUrls: ['./products-dexie.component.css']
})
export class ProductsDexieComponent {

  constructor(public dialog: MatDialog){}

  openDialog(){
    const dialogRef = this.dialog.open(ProductModelComponent);

    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

}
