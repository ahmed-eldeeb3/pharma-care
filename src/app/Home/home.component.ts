import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../Services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class Home {

  private cartService = inject(CartService);
  private router = inject(Router);

  constructor() {
    this.filteredMedicines = [];
  }

  // =========================== NAVIGATE TO DETAILS ============================
  showLocation(medicine: any) {
    this.router.navigate(['/detail'], { 
      state: { medicine: medicine } 
    });
  }

  // =========================== STATE ============================
  searchTerm: string = '';
  filteredMedicines: any[] = [];
  message: string = '';
  suggestions: any[] = [];
  showSuggestions: boolean = false;

  // =========================== MEDICINES DATA ============================
  medicines = [
    { id: 1, name: 'Panadol', location: 'Cairo Pharmacy', description: 'Pain reliever and fever reducer', image:'https://i.pinimg.com/736x/12/63/08/126308d92b265ed9e6f5e80d48d839a8.jpg', price: 25.99 },
    { id: 2, name: 'Panadol', location: 'Zag Pharmacy', description: 'Effective pain reliever and fever reducer.', image:'https://i.pinimg.com/736x/ab/30/72/ab30729e5d408af5c4e2bafb9f7fb9b9.jpg', price: 27.50 },
    { id: 3, name: 'Panadol', location: 'Passam Pharmacy', description: 'Gentle on the stomach.', image:'https://i.pinimg.com/736x/b0/e2/13/b0e2137c22f53d2181ba9b8a29fdb715.jpg', price: 24.99 },
    { id: 4, name: 'Panadol', location: 'White Pharmacy', description: 'Quick relief.', image:'https://i.pinimg.com/736x/f2/a0/16/f2a0161dbf01f40e861281fd4070a23a.jpg', price: 26.75 },
    { id: 5, name: 'Voltaren', location: 'Roshdy Pharmacy', description: 'Anti-inflammatory gel', image:'https://i.pinimg.com/736x/41/07/df/4107df066dac5126e3f22ac55e0361d9.jpg', price: 45.00 },
    { id: 6, name: 'Voltaren', location: 'Passam Pharmacy', description:'Anti-inflammatory gel', image:'https://i.pinimg.com/736x/41/07/df/4107df066dac5126e3f22ac55e0361d9.jpg', price: 42.50 },
    { id: 7, name: 'Cataflam', location: 'El Ezaby Pharmacy', description:'Anti-inflammatory', image:'https://i.pinimg.com/736x/3f/0a/63/3f0a6352fc2a1fab3c24f0cb8c8ab20c.jpg', price: 38.99 },
    { id: 8, name: 'Cataflam', location: 'Zag Pharmacy', description:'Pain relief', image:'https://i.pinimg.com/736x/c9/44/a5/c944a5bd20565f22b5be6e988425e48b.jpg', price: 40.25 },
    { id: 9, name: 'Aspirin', location: 'Seif Pharmacy', description:'Reduce pain', image:'https://i.pinimg.com/736x/e2/c4/82/e2c4820f899a912329f77be2352f028c.jpg', price: 15.50 },
    { id: 10, name: 'Aspirin', location: 'Zag Pharmacy', description:'Reduce pain', image:'https://i.pinimg.com/736x/5a/72/11/5a721188a42003979f97874f126e0f45.jpg', price: 16.75 },
  ];

  // =========================== SEARCH BUTTON ============================
  onSearch(term: string) {
    const searchTerm = (term || '').toLowerCase().trim();

    if (!searchTerm) {
      this.filteredMedicines = [];
      this.message = 'Write The Medicine Name Please';
      this.showSuggestions = false;
      return;
    }

    this.filteredMedicines = this.medicines.filter(med =>
      med.name.toLowerCase().includes(searchTerm)
    );

    this.message = this.filteredMedicines.length === 0
      ? `Not Found "${term}".`
      : `Find ${this.filteredMedicines.length} "${term}"`;

    this.showSuggestions = false;
  }

  // =========================== SUGGESTIONS WHILE TYPING ============================
  onInputChange(term: string) {
    const searchTerm = (term || '').toLowerCase().trim();
    
    if (!searchTerm) {
      this.suggestions = [];
      this.showSuggestions = false;
      return;
    }

    const uniqueNames = new Set<string>();
    this.suggestions = this.medicines
      .filter(med => {
        const match = med.name.toLowerCase().includes(searchTerm);
        if (match && !uniqueNames.has(med.name)) {
          uniqueNames.add(med.name);
          return true;
        }
        return false;
      })
      .slice(0, 5);

    this.showSuggestions = this.suggestions.length > 0;
  }

  // =========================== SELECT SUGGESTION ============================
  selectSuggestion(suggestion: any) {
    this.searchTerm = suggestion.name;
    this.onSearch(suggestion.name);
    this.showSuggestions = false;
  }

  // =========================== HIDE SUGGESTIONS ============================
  onBlur() {
    setTimeout(() => { this.showSuggestions = false; }, 200);
  }

  // =========================== ADD TO CART ============================
  addToCart(medicine: any) {
    this.cartService.addToCart(medicine);
    this.message = `${medicine.name} Added To Cart`;

    setTimeout(() => { this.message = ''; }, 3000);
  }
}
