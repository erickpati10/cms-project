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
      .get<{ message: string; documents: Document[] }>('http://localhost:3000/documents')
      .subscribe(
        (responseData) => {
          this.documents = responseData.documents ? responseData.documents : [];
          this.sortAndSend();
        },
        (error: any) => {
          console.error(error);
        },
      );
  }

  getDocument(id: string): Document | null {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    newDocument.id = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .post<{
        message: string;
        document: Document;
      }>('http://localhost:3000/documents', newDocument, { headers: headers })
      .subscribe(
        (responseData) => {
          this.documents.push(responseData.document);
          this.sortAndSend();
        },
        (error: any) => {
          console.error(error);
        },
      );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put('http://localhost:3000/documents/' + originalDocument.id, newDocument, {
        headers: headers,
      })
      .subscribe(
        () => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        },
        (error: any) => {
          console.error(error);
        },
      );
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === document.id);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/documents/' + document.id).subscribe(
      () => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      },
      (error: any) => {
        console.error(error);
      },
    );
  }

  private sortAndSend() {
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
  }
}
