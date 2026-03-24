import { Component, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.html',
  styleUrl: './message-item.css',
})
export class MessageItem {
  @Input() message: Message;

  constructor(private contactService: ContactService) {}

  getSenderName(): string {
    const contact: Contact = this.contactService.getContact(this.message?.sender);
    return contact ? contact.name : '';
  }
}
