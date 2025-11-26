import { HttpClient } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface UserSignUp {
  name: string,
  email: string,
  password: string,
  rePassword: string,
  phone: string,
}

interface UserSignIn {
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'https://ecommerce.routemisr.com';
  
  private http = inject(HttpClient);
  private router = inject(Router);
  
  currentUser = signal<any>(null);
  isLoggedIn = signal(false);

  constructor() {
    this.checkAuthState();
  }

  private checkAuthState() {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      this.isLoggedIn.set(true);
      this.currentUser.set(JSON.parse(userData));
    }
  }


  serSignUp(payload: UserSignUp): Observable<any> {
  const signupData = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    rePassword: payload.rePassword,
    phone: payload.phone
  };

  console.log('Sending signup data:', signupData);

  return this.http.post(`${this.API_URL}/api/v1/auth/signup`, signupData);
}


serSignIn(payload: UserSignIn): Observable<any> {
  const loginData = {
    email: payload.email,
    password: payload.password
  };

  return this.http.post(`${this.API_URL}/api/v1/auth/signin`, loginData).pipe(
    tap((response: any) => {
      console.log('Full API Response:', response); 
      
      if (response.token) {
        this.handleAuthSuccess(response);
      } else {
        console.error('No token in response:', response);
      }
    })
  );
}

private handleAuthSuccess(response: any) {

  if (!response.token || !response.user) {
    console.error('Invalid response structure:', response);
    return;
  }
  
  // Save token
  localStorage.setItem('auth_token', response.token);
  
  // Save user data
  const userData = {
    _id: response.user._id,
    name: response.user.name,
    email: response.user.email,
    role: response.user.role || 'user' // default value
  };
  
  localStorage.setItem('user_data', JSON.stringify(userData));
  
  // Update signals
  this.isLoggedIn.set(true);
  this.currentUser.set(userData);
  
  console.log('Login successful! User:', userData);
}


logout() {

  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');
  localStorage.removeItem('cart_items'); 
  localStorage.removeItem('cart'); 
  

  this.clearCartData();
  
  this.isLoggedIn.set(false);
  this.currentUser.set(null);
  this.router.navigate(['/signin']);
}

private clearCartData() {

  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('cart')) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
}

  getCurrentUser() {
    return this.currentUser();
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUserRole(): string {
    return this.currentUser()?.role || 'user';
  }

  hasValidToken(): boolean {
    const token = this.getToken();
    return !!token && this.isLoggedIn();
  }
}