import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList implements OnInit, OnDestroy {
  documents: Document[] = [];
  subscription: Subscription;

  constructor(
    private documentService: DocumentService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.subscription = this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents.slice();
        this.cd.detectChanges();
      },
    );

    this.documentService.getDocuments();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
