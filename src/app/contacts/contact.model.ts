export class Contact {
  _id?: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  group: Contact[];

  constructor(
    id: string,
    name: string,
    email: string,
    phone: string,
    imageUrl: string,
    group: Contact[] = [],
    _id?: string,
  ) {
    this._id = _id;
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.imageUrl = imageUrl;
    this.group = group;
  }
}
