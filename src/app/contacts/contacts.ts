import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';
@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
  providers: [ContactService],
})
export class Contacts implements OnInit {
  selectedContact: Contact | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.contactSelected.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    });
  }
}
