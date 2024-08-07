import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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

  currentYear: number;

facebook(url) {
  // window.location = "https://www.facebook.com";
  window.open(url, '_blank', 'noopener,noreferrer');
}

  dataSource = new MatTableDataSource([]);
  displayColumns: string[] = ['ProductName','ProductDescription','Price','Quantity','ManifacturedAt','ExpireAt','Actions'];
  response: any;
  resLength: any;
  dynamicProductRes:any;
  search: any = "";
  pageSizeOptions: number[] = [1,2,3,4,5,6,7,8,9,10];
  noContentMessage: any;
  searchContent: string = null;
  pageSize:any;

  constructor(
    public productService: ProductService,
    public http: HttpClient,
  ){
    this.currentYear = new Date().getFullYear();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(){
    this.loadDynamicProducts();
  }

  ngAfterViewInit(){

    this.paginator?.page.pipe(
      switchMap(() => {
        let currentPage = (this.paginator?.pageIndex ?? 0) + 1;
        let pageSize = (this.paginator?.pageSize ?? 5);
        
        return this.productService.GetDynamicProducts(currentPage, pageSize, this.search);
      }),
    ).subscribe((data) => {
      this.response = data;
      this.resLength = this.response.TotalCount;
      this.dataSource.data = this.response.Result;
    })

  }

  loadDynamicProducts(){

    let currentPage = (this.paginator?.pageIndex ?? 0) + 1;
    let pageSize = (this.paginator?.pageSize ?? 5);
    this.pageSize = pageSize;
    this.productService.GetDynamicProducts(currentPage, pageSize, this.search).subscribe((result) => {
      if(result){
        this.response = result;
        this.resLength = this.response.TotalCount;
        this.dataSource.data = this.response.Result;
      }
    })
  } 

  description(desc, words){
    if(desc.split(' ').length > words){
      return desc.split(' ').slice(0, words).join(' ') + '...';
    }
    return desc;
  }

  getImageUrl(imagePath: string): string {
    const baseUrl = 'http://192.168.1.25:8010/';
    return baseUrl + imagePath;
  }

  onSearch(search){
    console.log(search);
    this.search = search;
    let currentPage = (this.paginator?.pageIndex ?? 0) + 1;
    let pageSize = (this.paginator?.pageSize ?? 0);;
    this.productService.GetDynamicProducts(currentPage, pageSize, search).subscribe((response) => {
      if(response){
        this.response  = response;
        this.resLength = this.response.TotalCount;
        this.dataSource.data = this.response.Result;
        this.searchContent = "";
      }else{
        this.searchContent = "No content available"; 
        this.resLength = 0;
        this.dataSource.data = [];
        console.log("this.dataSource.data",this.dataSource.data);
      }
    })
  }

  deleteProduct(productId){
    this.productService.deleteProduct(productId).subscribe((res) => {
      console.log(res);
      location.reload();
    })
  }

  manufacturedDate(date){
    return date.split('T')[0];
  }

  expireDate(date){
    return date.split('T')[0];
  }
}
