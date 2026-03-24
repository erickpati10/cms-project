import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();

  private messages: Message[] = [];
  maxMessageId: number = 0;

  constructor(private http: HttpClient) {}

  getMessages(): void {
    this.http
      .get<Message[]>('https://cms-project-fece6-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages ? messages : [];
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.error(error);
        },
      );
  }

  getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (const message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  storeMessages() {
    const messagesJson = JSON.stringify(this.messages);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put('https://cms-project-fece6-default-rtdb.firebaseio.com/messages.json', messagesJson, {
        headers: headers,
      })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString();
    this.messages.push(newMessage);

    this.storeMessages();
  }
}
