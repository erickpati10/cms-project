import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  standalone: false,
  templateUrl: './message-edit.html',
  styleUrl: './message-edit.css',
})
export class MessageEdit {
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('msgTextInput') messageInputRef: ElementRef;

  currentSender: string = '2';

  constructor(private messageService: MessageService) {}

  onSendMessage() {
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgText = this.messageInputRef.nativeElement.value;
    if (!msgText) return;
    const newMessage = new Message('', msgSubject, msgText, this.currentSender);
    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
  }
}
