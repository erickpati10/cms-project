import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList implements OnInit, OnDestroy {
  messages: Message[] = [];
  subscription: Subscription;
  contactSubscription: Subscription;

  constructor(
    private messageService: MessageService,
    private contactService: ContactService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.subscription = this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages.slice();
      this.cd.detectChanges();
    });

    this.contactSubscription = this.contactService.contactChangedEvent.subscribe(() => {
      this.cd.detectChanges();
    });

    this.contactService.getContacts();
    this.messageService.getMessages();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.contactSubscription) {
      this.contactSubscription.unsubscribe();
    }
  }
}
