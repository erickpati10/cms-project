import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documents',
  standalone: false,
  templateUrl: './documents.html',
  styleUrl: './documents.css',
  providers: [DocumentService],
})
export class Documents implements OnInit {
  selectedDocument: Document | null = null;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documentService.documentSelected.subscribe((document: Document) => {
      this.selectedDocument = document;
    });
  }
}
