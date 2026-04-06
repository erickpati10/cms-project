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
      .get<{ message: string; contacts: Contact[] }>('http://localhost:3000/contacts')
      .subscribe(
        (responseData) => {
          this.contacts = responseData.contacts ? responseData.contacts : [];
          this.sortAndSend();
        },
        (error: any) => {
          console.error(error);
        },
      );
  }

  getContact(id: string): Contact | null {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    newContact.id = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .post<{
        message: string;
        contact: Contact;
      }>('http://localhost:3000/contacts', newContact, { headers: headers })
      .subscribe(
        (responseData) => {
          this.contacts.push(responseData.contact);
          this.sortAndSend();
        },
        (error: any) => {
          console.error(error);
        },
      );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex((c) => c.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put('http://localhost:3000/contacts/' + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe(
        () => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        },
        (error: any) => {
          console.error(error);
        },
      );
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex((c) => c.id === contact.id);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/contacts/' + contact.id).subscribe(
      () => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      },
      (error: any) => {
        console.error(error);
      },
    );
  }

  private sortAndSend() {
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
  }
}
