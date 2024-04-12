import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {

  dataSource =  new MatTableDataSource([]);
  displayColumns: string[] = ['orderId','productName','quantity','price','orderNumber','orderDate','Address','orderStatus','actions'];
  orderRes:any;
  searchText: string = '';

  constructor(
    public productService: ProductService
  ){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(){
    this.productService.GetAllOrders().subscribe((res) => {
      this.orderRes = res;
      this.dataSource.data = this.orderRes;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
    })
  }

  onSearch(text){
      this.dataSource.data = this.orderRes.filter(data => data.productObject.productName.toLowerCase().includes(text.toLowerCase()) || data.orderObject.orderId.includes(text.toLowerCase()) || data.orderObject.createdAt.includes(text) || data.orderObject.orderStatus.toLowerCase().includes(text.toLowerCase()) || data.orderObject.orderNumber.includes(text));
  }

  orderDate(date){
    return date.split('T')[0];
  }
}