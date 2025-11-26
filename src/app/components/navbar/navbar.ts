import { Component, inject, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../components/Auth/Services/cart.service';
import { AuthService } from '../../components/Auth/Services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
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