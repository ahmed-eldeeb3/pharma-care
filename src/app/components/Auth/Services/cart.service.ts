import { Injectable, signal, computed, inject } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = signal<CartItem[]>([]);
  
  totalItems = computed(() => 
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );
  
  totalPrice = computed(() =>
    this.cartItems().reduce((total, item) => total + (item.price * item.quantity), 0)
  );

  addToCart(medicine: any) {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.id === medicine.id);

    if (existingItem) {
      this.cartItems.update(items => 
        items.map(item => 
          item.id === medicine.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // add new item
      this.cartItems.update(items => [...items, {
        id: medicine.id,
        name: medicine.name,
        price: medicine.price,
        quantity: 1,
        image: medicine.image,
        location: medicine.location
      }]);
    }
    this.updateCartBadge();
  }

  removeFromCart(itemId: number) {
    this.cartItems.update(items => 
      items.filter(item => item.id !== itemId)
    );
    this.updateCartBadge();
  }

  updateQuantity(itemId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(itemId);
    } else {
      this.cartItems.update(items => 
        items.map(item => 
          item.id === itemId 
            ? { ...item, quantity }
            : item
        )
      );
    }
    this.updateCartBadge();
  }

  clearCart() {
    this.cartItems.set([]);
    this.updateCartBadge();
  }

  getCartItems() {
    return this.cartItems.asReadonly();
  }

  private updateCartBadge() {
    const total = this.totalItems();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = total.toString();
    });
  }
}