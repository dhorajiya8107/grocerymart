import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    private cartItemCountSubject: BehaviorSubject<number>;
    cartItemCount$: Observable<number>;

  constructor() {
    const initialCount = parseInt(localStorage.getItem('cartItemCount') || '0');
    this.cartItemCountSubject = new BehaviorSubject<number>(initialCount);
    this.cartItemCount$ = this.cartItemCountSubject.asObservable();
  }

  updateCartItemCount(count: number): void {
    localStorage.setItem('cartItemCount', count.toString());
    this.cartItemCountSubject.next(count);
  }

  getCurrentCartItemCount(): number {
    return this.cartItemCountSubject.value;
  }

  // Other methods for adding/removing products from the cart
}