import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
// import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelected = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];
  maxContactId: number = 0;

  constructor(private http: HttpClient) {}

  getContacts(): void {
    this.http
      .get<Contact[]>('https://cms-project-fece6-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts ? contacts : [];
          this.maxContactId = this.getMaxId();

          this.contacts.sort((a: Contact, b: Contact) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

          this.contactChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.error(error);
        },
      );
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  storeContacts() {
    const contactsJson = JSON.stringify(this.contacts);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put('https://cms-project-fece6-default-rtdb.firebaseio.com/contacts.json', contactsJson, {
        headers: headers,
      })
      .subscribe(() => {
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);

    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;

    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);

    this.storeContacts();
  }
}
