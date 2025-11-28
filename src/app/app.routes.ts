import { Routes } from '@angular/router';

import { DetailComponent } from '../app/detail/detail.component';
import { Home } from '../app/Home/home.component';
import { CartComponent } from '../app/cart/cart.component';
import { SignUp } from '../app/sign-up/sign-up.component';
import { Signin } from '../app/sign-in/sign-in.component';
import { authGuard } from './guards/auth.guard';

// الصفحات الجديدة
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { UserrequestComponent } from '../app/userrequest/userrequest.component';
import { ContactComponent } from '../app/contact/contact/contact.component';

// ✔️ ده الاسم الصحيح بناءً على الملف الموجود عندك
import { OrderhisComponentComponent } 
  from '../app/order-history/component/orderhis-component/orderhis-component.component';

export const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },

    { path: 'signin', component: Signin },
    { path: 'signup', component: SignUp },

    // صفحات محمية
    { path: 'home', component: Home, canActivate: [authGuard] },
    { path: 'cart', component: CartComponent, canActivate: [authGuard] },
    { path: 'detail', component: DetailComponent, canActivate: [authGuard] },

    // الصفحات اللي هتشتغل من الـ Sidebar
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'userrequest', component: UserrequestComponent, canActivate: [authGuard] },
    { path: 'contact', component: ContactComponent, canActivate: [authGuard] },
    
    // ✔️ تعديل الروت هنا
    { path: 'order-history', component: OrderhisComponentComponent, canActivate: [authGuard] },

    // Not found
    { path: '**', redirectTo: 'signin' }
];
