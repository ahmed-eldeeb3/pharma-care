
import { AuthService } from '../Services/auth';

// import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: '../sign-up/sign-up.component.html',
  styleUrls: ['../sign-up/sign-up.component.css'],
  standalone: true,
})
export class SignUp {
  private authService = inject(AuthService);
  private router = inject(Router);

  isRePassValid: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  errorStatus: number = 0;

  regForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rePassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  })

  signUp() {
    if (this.regForm.valid && this.isRePassValid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.errorStatus = 0;

      console.log('Sending signup request:', this.regForm.value);
      
      this.authService.serSignUp(this.regForm.value).subscribe({
        next: (res) => {
          console.log('Signup successful', res);
          this.isLoading = false;
          this.router.navigate(['/signin']);
          alert('Registration successful! Please login with your credentials.');
        },
        error: (err) => {
          console.error('Signup failed', err);
          this.isLoading = false;
          this.errorStatus = err.status;
          
          if (err.status === 409) {
            this.errorMessage = 'This email is already registered. Please use a different email.';
          } else if (err.status === 400) {
            this.errorMessage = err.error?.message || 'Invalid data provided.';
          } else if (err.status === 0) {
            this.errorMessage = 'Network error. Please check your connection.';
          } else {
            this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
          }
        }
      });
    } else {
      this.regForm.markAllAsTouched();
      if (!this.isRePassValid && this.regForm.get('rePassword')?.touched) {
        this.errorMessage = 'Passwords do not match';
      } else if (this.regForm.invalid) {
        this.errorMessage = 'Please fill in all required fields correctly.';
      }
    }
  }

  matchPass() {
    if (this.regForm.value.password == this.regForm.value.rePassword) {
      this.isRePassValid = true;
      this.errorMessage = '';
    } else {
      this.isRePassValid = false;
    }
  }

  goToSignIn() {
    this.router.navigate(['/signin']);
  }
}