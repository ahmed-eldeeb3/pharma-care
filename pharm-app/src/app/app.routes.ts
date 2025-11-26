import { DetailComponent } from './pages/detail/detail';
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CartComponent } from './pages/cart/cart';
import { SignUp } from './components/Auth/Components/sign-up/sign-up';
import { Signin } from './components/Auth/Components/signin/signin';
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