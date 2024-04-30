import { Injectable } from "@angular/core";
import Dexie from "dexie";

@Injectable({
    providedIn: 'root'
})
export class ProductsService{
    private db: Dexie;

    constructor(){
        this.db = new Dexie('productsDB');
        this.db.version(1).stores({
            products: '++id, name, price, quantity, manufacturedAt, expireAt'
        });
    }

    async getAllProducts(): Promise<any[]>{
        return await this.db.table<any>('products').toArray();
    }

    async getProductById(id: number): Promise<any[]>{
        return await this.db.table<any>('products').get(id);
    }

    async addProduct(product: any): Promise<any> {
        return await this.db.table<any>('products').add(product);
    }

    async updateProduct(id: number, product: any): Promise<any> {
        return await this.db.table<any>('products').update(id, product);
    }

    async deleteProduct(id:number): Promise<void> {
        return await this.db.table<any>('products').delete(id);
    }


}