import { Component, inject } from '@angular/core';
import { AuthService } from '../Services/auth';
// import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  templateUrl: '../sign-in/sign-in.component.html',
  styleUrl: '../sign-in/sign-in.component.css',
  standalone: true,
})
export class Signin {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  errorMessage = '';

  logForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  signIn() {
    if (this.logForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      console.log('Sending login request:', this.logForm.value);
      
      this.authService.serSignIn(this.logForm.value).subscribe({
        next: (res) => {
          console.log('Full login response:', res);
          console.log('Login successful', res);
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Login error details:', err);
          console.error('Login failed', err);
          this.isLoading = false;
          
          if (err.status === 401) {
            this.errorMessage = 'Invalid email or password. Please try again.';
          } else if (err.status === 0) {
            this.errorMessage = 'Network error. Please check your internet connection.';
          } else {
            this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
          }
        }
      });
    } else {
      this.logForm.markAllAsTouched();
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }
}