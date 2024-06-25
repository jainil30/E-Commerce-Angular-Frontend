import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: RegisterComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'product-details/:id',
        component: ProductDetailsComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'cart',
        component: CartComponent
    }
];
