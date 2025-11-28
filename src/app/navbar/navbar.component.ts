
import { Component, inject, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../Services/auth';
import { CartService } from '../Services/cart.service';



@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: '../navbar/navbar.component.html',
  styleUrl: '../navbar/navbar.component.css',
  standalone: true,
})
export class Navbar {
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  cartItemCount = computed(() => this.cartService.totalItems());
  
  // Computed signals for user state
  isLoggedIn = this.authService.isLoggedIn;
  currentUser = this.authService.currentUser;

  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}