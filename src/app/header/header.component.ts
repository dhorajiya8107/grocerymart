import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../Model/User';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    public cartService: CartService
  ){}

  isLoggedIn: boolean = false;
  private userSubject: Subscription;
  cartItemCount: number = 0;

  ngOnInit(){
    this.userSubject = this.authService.user.subscribe((user: User) => {
      this.isLoggedIn = user ? true : false;
    });
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    })
    // this.updateCartItemCount();
    // window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  // updateCartItemCount(){
  //   this.cartItemCount = parseInt(localStorage.getItem('cartItemCount') || '0');
  // }

  // storageEventListener(event: StorageEvent): void {
  //   if (event.key === 'cartItemCount') {
  //     this.updateCartItemCount();
  //   }
  // }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSubject.unsubscribe();
  }
}
