import { Routes } from '@angular/router';
import { OrderhisComponentComponent } from './order-history/component/orderhis-component/orderhis-component.component';
import { Orderdetails1Component } from './order-history/component/orderdetails1/orderdetails1.component';
import { Orderdetails2Component } from './order-history/component/orderdetails-2/orderdetails-2.component';
import { Orderdetails3Component } from './order-history/component/orderdetails-3/orderdetails-3.component';

export const routes: Routes = [
     {path:'',redirectTo:'history',pathMatch:'full'},
    {path:'history',component:OrderhisComponentComponent},
    {path:'details',component:Orderdetails1Component},
    {path:'details2',component:Orderdetails2Component},
    {path:'details3',component:Orderdetails3Component}
];
