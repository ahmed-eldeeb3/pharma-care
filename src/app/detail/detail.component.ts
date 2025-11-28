import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../Services/cart.service';
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="container mt-4">
  <button class="btn btn-outline-secondary mb-4" (click)="goBack()">
    <i class="fas fa-arrow-left me-2"></i>Back to Search
  </button>

  <!-- Success Message -->
  <div *ngIf="showSuccessMessage" class="alert alert-success alert-dismissible fade show" role="alert">
    <i class="fas fa-check-circle me-2"></i>
    <strong>{{medicine?.name}}</strong> added to cart successfully!
    <button type="button" class="btn-close" (click)="showSuccessMessage = false"></button>
  </div>

  <div class="row">
    <div class="col-md-6">
      <div class="card shadow-sm">
        <img 
          [src]="medicine?.image" 
          class="card-img-top img-fluid" 
          [alt]="medicine?.name"
          style="max-height: 500px; object-fit: contain;"
        />
      </div>
    </div>

    <div class="col-md-6">
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h2 class="card-title text-primary mb-3">{{ medicine?.name }}</h2>
          
          <div class="mb-4">
            <h5 class="text-secondary">Description</h5>
            <p class="card-text">{{ medicine?.description }}</p>
          </div>

          <div class="mb-4">
            <h5 class="text-secondary">Available at</h5>
            <p class="fs-5 text-success">
              <i class="fas fa-map-marker-alt me-2"></i>{{ medicine?.location }}
            </p>
          </div>

          <div class="mb-4">
            <h5 class="text-secondary">Price</h5>
            <p class="fs-4 text-success fw-bold">{{ getPrice() | currency:'EGP' }}</p>
          </div>

          <div class="d-grid">
            <button class="btn btn-success btn-lg" (click)="addToCart()" [disabled]="!medicine">
              <i class="fas fa-cart-plus me-2"></i>Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-4">
    <div class="col-12">
      <div class="card shadow-sm">
        <div class="card-header bg-primary text-white">
          <h5 class="mb-0">
            <i class="fas fa-map-marker-alt me-2"></i>Pharmacy Location
          </h5>
        </div>
        <div class="card-body">
          <div class="map-placeholder bg-light rounded p-5 text-center">
            <i class="fas fa-map-marked-alt fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">Map showing location of {{ medicine?.location }}</h5>
            <p class="text-muted">{{ getMapAddress() }}</p>
            
            <button class="btn btn-outline-primary mt-3" (click)="openGoogleMaps()">
              <i class="fas fa-external-link-alt me-2"></i>Open in Google Maps
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-4">
    <div class="col-md-6">
      <div class="card shadow-sm">
        <div class="card-header bg-info text-white">
          <h5 class="mb-0">
            <i class="fas fa-pills me-2"></i>Medicine Details
          </h5>
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <strong>Type:</strong> {{ getMedicineType() }}
            </li>
            <li class="list-group-item">
              <strong>Dosage:</strong> {{ getDosage() }}
            </li>
            <li class="list-group-item">
              <strong>Side Effects:</strong> {{ getSideEffects() }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card shadow-sm">
        <div class="card-header bg-warning text-dark">
          <h5 class="mb-0">
            <i class="fas fa-store me-2"></i>Pharmacy Information
          </h5>
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <strong>Phone:</strong> {{ getPharmacyPhone() }}
            </li>
            <li class="list-group-item">
              <strong>Working Hours:</strong> {{ getWorkingHours() }}
            </li>
            <li class="list-group-item">
              <strong>Rating:</strong> 
              <span class="text-warning">
                ★★★★☆ (4.5)
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
    .map-placeholder {
      min-height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    .alert {
      border-radius: 10px;
    }
    
    .card {
      border-radius: 15px;
      border: none;
    }
    
    .btn {
      border-radius: 10px;
    }
  `]
})
export class DetailComponent implements OnInit {
  private cartService = inject(CartService);
  private router = inject(Router);
  
  medicine: any;
  showSuccessMessage = false;

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.medicine = navigation?.extras.state?.['medicine'];
  }

  ngOnInit() {
    if (!this.medicine) {
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  addToCart() {
    if (!this.medicine) return;

    const medicineWithPrice = {
      ...this.medicine,
      price: this.getPrice()
    };

  
    this.cartService.addToCart(medicineWithPrice);
    
    this.showSuccessMessage = true;
    

    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  getPrice(): number {
    const prices: { [key: string]: number } = {
      'Panadol': 25.99,
      'Voltaren': 45.00,
      'Cataflam': 38.99,
      'Aspirin': 15.50
    };
    return prices[this.medicine.name] || 20.00;
  }

  getMapAddress(): string {
    const addresses: { [key: string]: string } = {
      'Cairo Pharmacy': '123 Nile Street, Downtown, Cairo',
      'Zag Pharmacy': '456 Zamalek, Cairo',
      'Passam Pharmacy': '789 Heliopolis, Cairo',
      'Roshdy Pharmacy': '321 Alexandria, Roshdy',
      'El Ezaby Pharmacy': '654 Mohandseen, Cairo',
      'Seif Pharmacy': '987 Maadi, Cairo',
      'White Pharmacy': '159 Nasr City, Cairo'
    };
    return addresses[this.medicine.location] || 'Cairo, Egypt';
  }

  openGoogleMaps() {
    const address = encodeURIComponent(this.getMapAddress());
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  }

  getMedicineType(): string {
    const types: { [key: string]: string } = {
      'Panadol': 'Pain Reliever & Fever Reducer',
      'Voltaren': 'Anti-inflammatory Gel',
      'Cataflam': 'Anti-inflammatory & Pain Relief',
      'Aspirin': 'Pain Reliever & Blood Thinner'
    };
    return types[this.medicine.name] || 'General Medicine';
  }

  getDosage(): string {
    return 'Take 1-2 tablets every 4-6 hours as needed';
  }

  getSideEffects(): string {
    return 'May cause stomach upset. Consult doctor if symptoms persist.';
  }

  getPharmacyPhone(): string {
    const phones: { [key: string]: string } = {
      'Cairo Pharmacy': '+20 2 1234 5678',
      'Zag Pharmacy': '+20 2 2345 6789',
      'Passam Pharmacy': '+20 2 3456 7890',
      'Roshdy Pharmacy': '+20 3 4567 8901',
      'El Ezaby Pharmacy': '+20 2 5678 9012',
      'Seif Pharmacy': '+20 2 6789 0123',
      'White Pharmacy': '+20 2 7890 1234'
    };
    return phones[this.medicine.location] || '+20 2 0000 0000';
  }

  getWorkingHours(): string {
    return '9:00 AM - 11:00 PM (Daily)';
  }
}