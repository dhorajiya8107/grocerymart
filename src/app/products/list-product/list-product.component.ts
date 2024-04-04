import { Component, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { STRING_TYPE } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {

  dataSource = new MatTableDataSource([]);
  displayColumns: string[] = ['ProductName','ProductDescription','Price','Quantity','ManifacturedAt','ExpireAt','Actions'];
  response: any;
  resLength: any;
  dynamicProductRes:any;
  ItemPerPage: number = 1;
  pageNo: number = 1;
  search: any = "";
  pageSizeOptions: number[] = [];

  constructor(
    public productService: ProductService,
    public http: HttpClient
  ){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(){
    
    // this.productService.getProducts().subscribe((res) => {
    //   this.response = res;
    //   this.response =  this.response.ServiceObject;
    //   console.log(this.response);
    //   // this.resLength = this.response.length;
    //   // console.log(this.resLength);
    //   // this.dataSource.paginator = this.paginator;
    //   // this.pageSizeOptions = [this.pageSize];

    //   // for(let i in this.dataSource.data){
    //   //   parseInt(i);
    //   //   console.log(typeof i);
    //   // }
    //   // this.dataSource.data.map((val, index) => {
    //   //   console.log(index+1);
    //   //   this.pageSizeOptions2.push(index+1);
    //   // });
    //   // console.log(this.pageSizeOptions2);
    //   // console.log(this.pageSizeOptions);
      
      
    //   // this.pageSizeOptions = [5];
    // })

    this.ItemPerPage = 3; 
    this.loadDynamicProducts();
    
  }

  loadDynamicProducts(){
    this.productService.GetDynamicProducts(this.pageNo, this.ItemPerPage, this.search).subscribe((res) => {
        this.response = res;
        this.dataSource.data = this.response.ServiceObject.Result;
        this.resLength = this.response.ServiceObject.TotalCount; // Set the total length
        this.dataSource.paginator = this.paginator; // Set the paginator
        this.pageSizeOptions = [this.ItemPerPage];
        this.dataSource._updateChangeSubscription();
    });
}

  onPageChange(event) {
    // this.pageSize = event.pageSize;
    // console.log(this.pageSize);
    this.pageNo = event.pageIndex+1;
    console.log(this.pageNo);
    this.loadDynamicProducts();
  }

  onInputpageNo(pageNo) {
    // pageNo = parseInt(pageNo);
    // console.log("type of pageNo",typeof pageNo);
    // this.pageNo = pageNo;
    // console.log("pageNo",this.pageNo);
    // this.loadDynamicProducts();
}

onInputpageSize(pageSize) {
  const pagesize = parseInt(pageSize.value);
  if(!isNaN(pagesize)){
    this.ItemPerPage = pagesize;
    this.loadDynamicProducts();
  }else{
    console.log("invalid page size");  
  }
}
// 
  onSearch(search){
    this.search = search;
    this.loadDynamicProducts();
  }

  manufacturedDate(date){
    return date.split('T')[0];
  }

  expireDate(date){
    return date.split('T')[0];
  }
}
