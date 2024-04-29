import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'; 
import { AuthGuard } from './RouteGuards/authGuard';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { ListProductComponent } from './products/list-product/list-product.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { CartComponent } from './products/cart/cart.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { TodoComponent } from './todo/todo.component';
import { TodoDexieComponent } from './todo-dexie/todo-dexie.component';
import { TodoRxjsComponent } from './todo-rxjs/todo-rxjs.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'productDetails/:id', component: ProductDetailsComponent, canActivate: [AuthGuard] },
  { path: 'createProduct', component: CreateProductComponent, canActivate: [AuthGuard] },
  { path: 'createProduct/:id', component: CreateProductComponent, canActivate: [AuthGuard] },
  { path: 'productList', component: ListProductComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'orderList', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'todo-list', component: TodoDexieComponent },
  { path: 'todolist', component: TodoRxjsComponent },
  { path: '**', redirectTo: 'login', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
