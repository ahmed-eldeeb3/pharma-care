import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false; 


  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }


  get f() {
    return this.contactForm.controls;
  }

  // Initialize form (
  private initForm() {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  submit() {
    this.submitted = true; 

    // Stop if the form is invalid
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched(); 
      return;
    }


    // 1. Prepare the message data for saving
    const newContactMessage: Contact = {
      id: new Date().getTime().toString(), // Create ID
      createdAt: Date.now(), // Timestamp
      ...this.contactForm.value // Add all form data 
    };
    
 
    this.contactService.add(newContactMessage);

    alert('Message sent and saved successfully!');
    console.log('Form data saved to localStorage:', newContactMessage);

    this.contactForm.reset();
    this.submitted = false;
  }
}