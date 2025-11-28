import { DetailComponent } from '../app/detail/detail.component';
import { Routes } from '@angular/router';
import { Home } from '../app/Home/home.component';
import { CartComponent } from '../app/cart/cart.component';
import { SignUp } from '../app/sign-up/sign-up.component';
import { Signin } from '../app/sign-in/sign-in.component';
import { authGuard } from './guards/auth.guard';
 
export const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: Signin },
    { path: 'signup', component: SignUp },
 
    { path: 'home', component: Home, canActivate: [authGuard] },
    { path: 'cart', component: CartComponent, canActivate: [authGuard] },
    { path: 'detail', component: DetailComponent, canActivate: [authGuard] },
   
    { path: '**', redirectTo: 'signin' }
];