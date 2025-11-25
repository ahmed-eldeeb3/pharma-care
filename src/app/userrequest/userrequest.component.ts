import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone }
from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
@Component({
  selector: 'app-userrequest',
  standalone: true,
  imports: [],
  templateUrl: './userrequest.component.html',
  styleUrl: './userrequest.component.css'
})
export class UserrequestComponent {
  center: google.maps.LatLngLiteral = { lat: 30.0444, lng: 31.2357 };
  zoom = 13;
  markerPosition?: google.maps.LatLngLiteral;

  mapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: true,
  };

  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild('addressInput') addressInput!: ElementRef<HTMLInputElement>;

  form!: FormGroup;
  selectedFile: File | null = null;
  dosageOptions = ['1mg', '2mg', '5mg', '10mg'];

  private geocoder!: google.maps.Geocoder;
  private placesAutocomplete?: google.maps.places.Autocomplete;

  constructor(private fb: FormBuilder, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.geocoder = new google.maps.Geocoder();
    this.form = this.fb.group({
      drugName: ['', Validators.required],
      dosage: ['1mg', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      acceptAlternative: [false],
      deliveryMethod: ['home'],
      phone: ['', Validators.pattern(/^(010|011|012|015)\d{8}$/)],
      locationText: [''],
      lat: [null],
      lng: [null],
      prescriptionFile: [null]
    });
  }

  ngAfterViewInit(): void {
    this.placesAutocomplete = new google.maps.places.Autocomplete(
      this.addressInput.nativeElement,
      { fields: ['formatted_address', 'geometry', 'name'] }
    );

    this.placesAutocomplete.addListener('place_changed', () => {
      const place = this.placesAutocomplete!.getPlace();
      this.ngZone.run(() => {
        if (place.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          this.setMapLocation(lat, lng, place.formatted_address || place.name || '');
        }
      });
    });
  }

  useMyLocation(): void {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      this.reverseGeocode(lat, lng).then((address) => {
        this.setMapLocation(lat, lng, address);
      });
    });
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    if (!event.latLng) return;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    this.reverseGeocode(lat, lng).then((address) => {
      this.setMapLocation(lat, lng, address);
    });
  }

  private setMapLocation(lat: number, lng: number, address: string): void {
    this.center = { lat, lng };
    this.markerPosition = { lat, lng };
    this.form.patchValue({ lat, lng, locationText: address });
  }

  private reverseGeocode(lat: number, lng: number): Promise<string> {
    return new Promise((resolve) => {
      this.geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results && results.length) resolve(results[0].formatted_address!);
        else resolve('Unknown location');
      });
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
    this.form.patchValue({ prescriptionFile: this.selectedFile });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    const formData = new FormData();

    Object.keys(value).forEach((key) => {
      if (value[key] !== null && value[key] !== undefined) {
        formData.append(key, value[key]);
      }
    });

    if (this.selectedFile) formData.append('prescription', this.selectedFile);

    console.log('Final Data', value);
  }
}

