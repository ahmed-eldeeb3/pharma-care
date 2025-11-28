import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  cards = [
    { title: 'Total Products', value: 1250, icon: 'fas fa-box-open', bg: 'bg-primary' },
    { title: "Today's Revenue", value: 5400, icon: 'fas fa-dollar-sign', bg: 'bg-success' },
    { title: 'New Visitors', value: 85, icon: 'fas fa-users', bg: 'bg-info' },
    { title: 'Pending Orders', value: 12, icon: 'fas fa-shopping-cart', bg: 'bg-warning' }
  ];

  orders = [
    { id: 1001, customer: 'Ahmed Said', status: 'Completed', statusClass: 'bg-success', date: '2025-10-25' },
    { id: 1002, customer: 'Fatima Ali', status: 'In Review', statusClass: 'bg-warning', date: '2025-10-25' },
    { id: 1003, customer: 'Khaled Mohamed', status: 'Cancelled', statusClass: 'bg-danger', date: '2025-10-24' },
    { id: 1004, customer: 'Mostafa', status: 'Cancelled', statusClass: 'bg-danger', date: '2025-10-24' },
    { id: 1005, customer: 'Mahmoud', status: 'Completed', statusClass: 'bg-success', date: '2025-10-24' },
    { id: 1006, customer: 'Mohamed', status: 'In Review', statusClass: 'bg-warning', date: '2025-10-24' },
    { id: 1007, customer: 'Ali', status: 'Completed', statusClass: 'bg-success', date: '2025-10-24' }
  ];
}