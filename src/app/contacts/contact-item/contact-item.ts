import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-item',
  standalone: false,
  templateUrl: './contact-item.html',
  styleUrl: './contact-item.css',
})
export class ContactItem {
  @Input() contact!: Contact;
  @Output() selected = new EventEmitter<Contact>();

  onClick() {
    this.selected.emit(this.contact);
  }
}
