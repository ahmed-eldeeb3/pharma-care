import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../Services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: '../cart/cart.component.html',
  styleUrls: ['./cart.component.css']

})
export class CartComponent {
  private cartService = inject(CartService);

  
  cartItems = this.cartService.getCartItems();
  

  totalPrice = this.cartService.totalPrice;
  totalItems = this.cartService.totalItems;

  increaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.quantity - 1);
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  checkout() {
  if (this.cartItems().length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  const total = this.totalPrice();
  const itemsCount = this.totalItems();
  
  alert(`Order completed successfully!\n\nTotal: ${total} EGP\nItems: ${itemsCount}\n\nYour order will be delivered within 24 hours`);
  
  this.clearCart();
}
}