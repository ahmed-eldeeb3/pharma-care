import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-userrequest',
  standalone: true,   // ← أضف هذا السطر
  templateUrl: './userrequest.component.html',
  styleUrls: ['./userrequest.component.css']
})

export class UserrequestComponent implements OnInit {

  requestForm!: FormGroup;
  address = "Select location...";

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.requestForm = this.fb.group({
      drugName: ['', Validators.required],
      dosage: ['1mg'],
      quantity: ['1'],
      acceptAlternative: [false],
      location: [''],
      deliveryMethod: ['delivery'],
      phone: [''],
      file: [null]
    });
  }

  useMyLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.address = `Lat: ${pos.coords.latitude.toFixed(4)}, 
                      Lng: ${pos.coords.longitude.toFixed(4)}`;

      this.requestForm.patchValue({
        location: this.address
      });
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.requestForm.patchValue({ file });
  }

  submitRequest() {
    console.log(this.requestForm.value);
    alert("Request submitted!");
  }
}
