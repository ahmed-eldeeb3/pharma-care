import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private storageKey = 'pharmacare_contacts';

  constructor() {}

  private readStorage(): Contact[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) as Contact[] : [];
  }

  private writeStorage(contacts: Contact[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }

  getAll(): Contact[] {
    return this.readStorage().sort((a,b) => b.createdAt - a.createdAt);
  }

  add(contact: Contact) {
    const arr = this.readStorage();
    arr.push(contact);
    this.writeStorage(arr);
  }

  update(id: string, updated: Partial<Contact>) {
    const arr = this.readStorage();
    const idx = arr.findIndex(c => c.id === id);
    if (idx > -1) {
      arr[idx] = { ...arr[idx], ...updated };
      this.writeStorage(arr);
    }
  }

  delete(id: string) {
    const arr = this.readStorage().filter(c => c.id !== id);
    this.writeStorage(arr);
  }

  clearAll() {
    localStorage.removeItem(this.storageKey);
  }
}
