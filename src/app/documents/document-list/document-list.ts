import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      '1',
      'CIT 360 - Object Oriented Programming',
      'Covers object-oriented design principles, classes, inheritance, and design patterns using real-world programming examples.',
      'https://example.com/Object-Oriented-Programming',
    ),
    new Document(
      '2',
      'CIT 366 - Full Web Stack Development',
      'Learn how to development modern web application using the MEAN stack',
      'https://example.com/Full-Web-Stack-Development',
    ),
    new Document(
      '3',
      'CIT 425 - Data Werehousing',
      'Introduces data warehousing concepts including ETL processes, dimensional modeling, and analytical reporting.',
      'https://example.com/Data-Werehousing',
    ),
    new Document(
      '4',
      'CIT 460 - Enterprise Development',
      'Examines enterprise-level application development, system integration, and scalable architecture patterns.',
      'https://example.com/Enterprise-Development',
    ),
    new Document(
      '5',
      'CIT 495 - Senior Practicum',
      'Capstone course involving real-world projects, teamwork, and professional software development practices.',
      'https://example.com/Senior-Practicum',
    ),
  ];

  onSelected(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
