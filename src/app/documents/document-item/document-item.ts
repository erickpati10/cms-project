import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-item',
  standalone: false,
  templateUrl: './document-item.html',
  styleUrl: './document-item.css',
})
export class DocumentItem {
  @Input() document!: Document;

  constructor(private documentService: DocumentService) {}

  onClick() {
    this.documentService.documentSelected.emit(this.document);
  }
}
