import { Routes } from '@angular/router';

import { DetailComponent } from '../app/detail/detail.component';
import { Home } from '../app/Home/home.component';
import { CartComponent } from '../app/cart/cart.component';
import { SignUp } from '../app/sign-up/sign-up.component';
import { Signin } from '../app/sign-in/sign-in.component';
import { authGuard } from './guards/auth.guard';

import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { UserrequestComponent } from '../app/userrequest/userrequest.component';
import { ContactComponent } from '../app/contact/contact/contact.component';

import { OrderhisComponentComponent } 
  from '../app/order-history/component/orderhis-component/orderhis-component.component';
import { Orderdetails1Component } from './order-history/component/orderdetails1/orderdetails1.component';
import { Orderdetails2Component } from './order-history/component/orderdetails-2/orderdetails-2.component';
import { Orderdetails3Component } from './order-history/component/orderdetails-3/orderdetails-3.component';

export const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },

    { path: 'signin', component: Signin },
    { path: 'signup', component: SignUp },


    { path: 'home', component: Home, canActivate: [authGuard] },
    { path: 'cart', component: CartComponent, canActivate: [authGuard] },
    { path: 'detail', component: DetailComponent, canActivate: [authGuard] },

    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'userrequest', component: UserrequestComponent, canActivate: [authGuard] },
    { path: 'contact', component: ContactComponent, canActivate: [authGuard] },

    { path: 'order-history', component: OrderhisComponentComponent, canActivate: [authGuard] },
    { path: 'orderdetails1', component: Orderdetails1Component, canActivate: [authGuard] },
    { path: 'orderdetails2', component: Orderdetails2Component, canActivate: [authGuard] },
    { path: 'orderdetails3', component: Orderdetails3Component, canActivate: [authGuard] },

    { path: '**', redirectTo: 'signin' }
];
