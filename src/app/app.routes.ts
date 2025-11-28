import { Routes } from '@angular/router';

// ============ Order History Imports ============
import { OrderhisComponentComponent } from './order-history/component/orderhis-component/orderhis-component.component';
import { Orderdetails1Component } from './order-history/component/orderdetails1/orderdetails1.component';
import { Orderdetails2Component } from './order-history/component/orderdetails-2/orderdetails-2.component';
import { Orderdetails3Component } from './order-history/component/orderdetails-3/orderdetails-3.component';

// ============ User Request Import ============
import { UserrequestComponent } from './userrequest/userrequest.component';

// ============ Contact Import ============
import { ContactComponent } from './contact/contact/contact.component';

export const routes: Routes = [

  // ========== Default Home Route ==========
  { path: '', redirectTo: 'history', pathMatch: 'full' },

  // ========== Order History ==========
  { path: 'history', component: OrderhisComponentComponent },

  // ========== Order Details Routes ==========
  { path: 'history/details/1', component: Orderdetails1Component },
  { path: 'history/details/2', component: Orderdetails2Component },
  { path: 'history/details/3', component: Orderdetails3Component },

  // ========== User Request ==========
  { path: 'user-request', component: UserrequestComponent },

  // ========== Contact Us ==========
  { path: 'contact', component: ContactComponent },

  // ========== Wildcard (Page Not Found) ==========
  { path: '**', redirectTo: 'history' }
];
