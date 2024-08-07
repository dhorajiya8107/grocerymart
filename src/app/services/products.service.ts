import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap, throwError } from "rxjs";
const api = "api_url";

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    constructor(
        public http: HttpClient
    ){}

    getProducts(){
        return this.http.get(`${api}/GetAllProducts`);
    }

    getAllCategories(){
        return this.http.get(`${api}/GetAllCategories`);
    }

    getProductById(id){
        return this.http.get(`${api}/GetProductById/${id}`);
    }

    addProduct(data){
       
        return this.http.post(`${api}/AddNewProduct`, data)
        .pipe(catchError(this.handleError), tap((res) => {
            return res;
        }))
    }

    updateProduct(data){
        return this.http.post(`${api}/UpdateProduct`, data)
        .pipe(catchError(this.handleError), tap((res) => {
            return res;
        }))
    }

    deleteProduct(id){
        return this.http.delete(`${api}/DeleteProduct/${id}`);
    }

    GetDynamicProducts(pageNo, pageSize, search){
        return this.http.get(`${api}/GetDynamicProductList/${pageNo}/${pageSize}?searchText=${search}`);
    }

    AddOrder(data){
        return this.http.post(`${api}/AddOrder`, data)
        .pipe(catchError(this.handleError), tap((res)=> {
            return res;
        }))
    }

    GetAllOrders(){
        return this.http.get(`${api}/GetAllOrdersList`);
    }

    handleError(err){
        return throwError(() => err);
    }

    deleteOrder(orderId){
        return this.http.delete(`${api}/DeleteOrder/${orderId}`)
    }
}