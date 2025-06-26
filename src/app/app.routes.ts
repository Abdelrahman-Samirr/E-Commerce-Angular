import { Routes } from '@angular/router';
import { Products } from './products/products';
import { LoginPage } from './login-page/login-page';
import { RegisterPage } from './register-page/register-page';
import { ProductDetail } from './product-detail/product-detail';
import { Cart } from './cart/cart';
import { NotFound } from './not-found/not-found';



export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: Products },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'product/:id', component: ProductDetail },
  { path: 'cart', component: Cart },
  { path: '**', component: NotFound }
];
