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
      .get<{ message: string; messages: Message[] }>('http://localhost:3000/messages')
      .subscribe(
        (responseData) => {
          this.messages = responseData.messages ? responseData.messages : [];
          this.sortAndSend();
        },
        (error: any) => {
          console.error(error);
        },
      );
  }

  getMessage(id: string): Message | null {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    newMessage.id = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .post<{
        message: string;
        messageObj: Message;
      }>('http://localhost:3000/messages', newMessage, { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.messageObj);
          this.sortAndSend();
        },
        (error: any) => {
          console.error(error);
        },
      );
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex((m) => m.id === originalMessage.id);

    if (pos < 0) {
      return;
    }

    newMessage.id = originalMessage.id;
    newMessage._id = originalMessage._id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put('http://localhost:3000/messages/' + originalMessage.id, newMessage, {
        headers: headers,
      })
      .subscribe(
        () => {
          this.messages[pos] = newMessage;
          this.sortAndSend();
        },
        (error: any) => {
          console.error(error);
        },
      );
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }

    const pos = this.messages.findIndex((m) => m.id === message.id);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/messages/' + message.id).subscribe(
      () => {
        this.messages.splice(pos, 1);
        this.sortAndSend();
      },
      (error: any) => {
        console.error(error);
      },
    );
  }

  private sortAndSend() {
    this.messages.sort((a: Message, b: Message) => {
      if (a.subject < b.subject) {
        return -1;
      }
      if (a.subject > b.subject) {
        return 1;
      }
      return 0;
    });

    this.messageChangedEvent.next(this.messages.slice());
  }
}
