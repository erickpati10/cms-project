import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentSelected = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();

  private documents: Document[] = [];
  maxDocumentId: number = 0;

  constructor(private http: HttpClient) {}

  getDocuments(): void {
    this.http
      .get<Document[]>('https://cms-project-fece6-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents ? documents : [];
          this.maxDocumentId = this.getMaxId();

          this.documents.sort((a: Document, b: Document) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

          this.documentChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error(error);
        },
      );
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeDocuments() {
    const documentsJson = JSON.stringify(this.documents);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put('https://cms-project-fece6-default-rtdb.firebaseio.com/documents.json', documentsJson, {
        headers: headers,
      })
      .subscribe(() => {
        this.documentChangedEvent.next(this.documents.slice());
      });
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;

    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);

    this.storeDocuments();
  }
}
