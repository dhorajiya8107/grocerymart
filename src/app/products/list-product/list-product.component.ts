import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit , AfterViewInit{

  dataSource = new MatTableDataSource([]);
  displayColumns: string[] = ['ProductName','ProductDescription','Price','Quantity','ManifacturedAt','ExpireAt','Actions'];
  response: any;
  resLength: any;
  dynamicProductRes:any;
  search: any = "";
  pageSizeOptions: number[] = [3,4,5,6,7];
  noContentMessage: any;
  searchContent: string = null;

  constructor(
    public productService: ProductService,
    public http: HttpClient,
  ){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(){

    // this.productService.GetDynamicProducts(1, 3).subscribe((res) => {
    //   this.response = res;
    //   this.resLength = this.response.ServiceObject?.TotalCount;
    //   this.dataSource.data = this.response.ServiceObject.Result;
    //   this.dataSource.paginator = this.paginator;

    // })
    
    // this.productService.getProducts().subscribe((res) => {
    //   this.response = res;
    //   this.response =  this.response.ServiceObject;
    //   console.log(this.response);
    //   this.dataSource.data = this.response;
    //   // this.resLength = this.response.length;
    //   // console.log(this.resLength);
    //   this.dataSource.paginator = this.paginator;
    //   // this.pageSizeOptions = [this.pageSize];

    //   // for(let i in this.dataSource.data){
    //   //   parseInt(i);
    //   //   console.log(typeof i);
    //   // }
    //   // this.dataSource.data.map((val, index) => {
    //   //   console.log(index+1);
    //   //   this.pageSizeOptions2.push(index+1);
    //   // });
    //   console.log(this.pageNo);
    //   console.log(this.ItemPerPage);
    //   // console.log(this.pageSizeOptions);
      
      
    //   // this.pageSizeOptions = [5];
    // })

    // this.ItemPerPage = 3; 

    // this.loadDynamicProducts();
  }

  ngAfterViewInit(){

    this.loadDynamicProducts();
    this.paginator?.page.pipe(
      switchMap(() => {
        let currentPage = (this.paginator?.pageIndex ?? 0) + 1;
        let pageSize = (this.paginator?.pageSize ?? 3);
        return this.productService.GetDynamicProducts(currentPage, pageSize, this.search);
      }),
      map(result => result)
    ).subscribe((data) => {
      console.log(data);
      this.response = data;
      this.resLength = this.response.ServiceObject.TotalCount;
      this.dataSource.data = this.response.ServiceObject.Result;
    })

  }

  loadDynamicProducts(){
    
    // this.paginator?.page.pipe(
    //   switchMap(() => {
    //     let currentPage = (this.paginator?.pageIndex ?? 0) + 1;
    //     let pageSize = (this.paginator?.pageSize ?? 0);
    //     return this.productService.GetDynamicProducts(currentPage, pageSize, this.search);
    //   }),
    //   map(result => result)
    // ).subscribe((data) => {
    //   this.response = data;
    //   this.resLength = this.response.ServiceObject.TotalCount;
    //   this.dataSource.data = this.response.ServiceObject.Result;
    // })

    // let currentPage = (this.paginator?.pageIndex ?? 0) + 1;
    // let pageSize = (this.paginator?.pageSize ?? 3);;
    // this.productService.GetDynamicProducts(currentPage, pageSize, this.search).subscribe((result) => {
    //   if(result){
    //     this.resLength = this.response.ServiceObject.TotalCount;
    //     this.dataSource.data = this.response.ServiceObject.Result;
    //   }
    // })
  }
// 
  
  onPageChange(event) {
    // this.ItemPerPage = event.pageSize;
    // this.pageNo = event.pageIndex;
    // this.productService.GetDynamicProducts(this.pageNo+1, this.ItemPerPage).subscribe((res) => {
    //   this.response = res;
    //   console.log(this.response);
    //   this.dataSource.data = this.response.ServiceObject.Result;
    //   this.resLength = this.response.ServiceObject.TotalCount;
    //   // this.cdr.detectChanges();
    //   this.dataSource.paginator = this.paginator;
    
    //   console.log(this.pageNo);
    //   console.log(this.ItemPerPage);
    //   console.log(this.resLength);
  
    // })
    // this.loadDynamicProducts();
  }

  onInputpageNo(pageNo) {
    // pageNo = parseInt(pageNo);
    // console.log("type of pageNo",typeof pageNo);
    // this.pageNo = pageNo;
    // console.log("pageNo",this.pageNo);
    // this.loadDynamicProducts();
}

onInputpageSize(pageSize) {
  // const pagesize = parseInt(pageSize.value);
  // if(!isNaN(pagesize)){
  //   this.ItemPerPage = pagesize;
  //   this.loadDynamicProducts();
  // }else{
  //   console.log("invalid page size");  
  // }
}
// 
  onSearch(search){
    console.log(search);
    this.search = search;
    let currentPage = (this.paginator?.pageIndex ?? 0) + 1;
    let pageSize = (this.paginator?.pageSize ?? 3);;
    this.productService.GetDynamicProducts(currentPage, pageSize, search).subscribe((response) => {
      if(response){
        this.response  = response;
        console.log(this.response);
        console.log(this.response.StatusCode);
          this.resLength = this.response.ServiceObject.TotalCount;
          this.dataSource.data = this.response.ServiceObject.Result;
          console.log(this.dataSource.data);
      }else{
        this.searchContent = "No content available"; 
          this.resLength = 0;
          this.dataSource.data = [];
          console.log("this.dataSource.data",this.dataSource.data);
      }
    })
    // this.loadDynamicProducts();
  }

  manufacturedDate(date){
    return date.split('T')[0];
  }

  expireDate(date){
    return date.split('T')[0];
  }
}
