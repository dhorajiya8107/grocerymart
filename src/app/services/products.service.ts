import { HttpClient } from "@angular/common/http";
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

    addProduct(data){
        return this.http.post(`${api}/AddNewProduct`, data)
        .pipe(catchError(this.handleError), tap((res) => {
            return res;
        }))
    }

    handleError(err){
        return throwError(() => err);
    }
}