import { Routes } from '@angular/router';
import { Nav } from './nav/nav';
import { Products } from './products/products';
import { LoginPage } from './login-page/login-page';
import { RegisterPage } from './register-page/register-page';
import { ProductDetail } from './product-detail/product-detail';
import { Cart } from './cart/cart';



export const routes: Routes = [
  { path: 'home', component: Products },
  { path: 'a', component: Nav },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'product/:id', component: ProductDetail },
  { path: 'cart', component: Cart }
];
