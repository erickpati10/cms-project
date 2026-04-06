export class Message {
  _id?: string;
  id: string;
  subject: string;
  msgText: string;
  sender: any;

  constructor(id: string, subject: string, msgText: string, sender: any, _id?: string) {
    this._id = _id;
    this.id = id;
    this.subject = subject;
    this.msgText = msgText;
    this.sender = sender;
  }
}
