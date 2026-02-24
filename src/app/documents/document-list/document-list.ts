import { Component } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {
    this.documents = this.documentService.getDocuments();

    this.documentService.documentChangedEvent.subscribe((documentsList: Document[]) => {
      this.documents = documentsList;
    });
  }

  ngOnInit() {}
}
