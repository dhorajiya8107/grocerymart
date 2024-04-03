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

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'createProduct', component: CreateProductComponent, canActivate: [AuthGuard] },
  { path: 'productList', component: ListProductComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: '**', redirectTo: 'login', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
