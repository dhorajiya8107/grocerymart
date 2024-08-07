import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { ApiInterceptor } from './services/api-interceptor.service';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ListProductComponent } from './products/list-product/list-product.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { CartComponent } from './products/cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { TodoComponent } from './todo/todo.component';
import { NgxsModule } from '@ngxs/store';
import { TodoState } from './todo/todo-state';
import { TodoDexieComponent } from './todo-dexie/todo-dexie.component';
import { TodoRxjsComponent } from './todo-rxjs/todo-rxjs.component';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { ProductsDexieComponent } from './products-dexie/products-dexie.component';
import { ProductModelComponent } from './products-dexie/product-model/product-model.component';
import { PolicyComponent } from './policy/policy.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AboutUsComponent } from './footer/about-us/about-us.component';
import { PrivacyPolicyComponent } from './footer/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './footer/terms-and-conditions/terms-and-conditions.component';
import { FAQSComponent } from './footer/faqs/faqs.component';
import { ContactUsComponent } from './footer/contact-us/contact-us.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    ForgotPasswordComponent,
    SignupComponent,
    ProductsComponent,
    CreateProductComponent,
    ListProductComponent,
    ProductDetailsComponent,
    CartComponent,
    OrdersComponent,
    OrderListComponent,
    TodoComponent,
    TodoDexieComponent,
    TodoRxjsComponent,
    ProductsDexieComponent,
    ProductModelComponent,
    PolicyComponent,
    CheckoutComponent,
    AboutUsComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    FAQSComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    NgxsModule.forRoot([TodoState]),
    NgxsStoragePluginModule.forRoot()
  ],
  providers: [
    provideAnimations(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
