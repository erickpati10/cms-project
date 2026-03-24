import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactList implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription: Subscription;
  term: string = '';

  constructor(
    private contactService: ContactService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.subscription = this.contactService.contactChangedEvent.subscribe(
      (contactsList: Contact[]) => {
        this.contacts = contactsList.slice();
        this.cd.detectChanges();
      },
    );

    this.contactService.getContacts();
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
