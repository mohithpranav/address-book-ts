console.log("Welcome to the Address Book Application!");

// UC1: Create Contact class with person details
class Contact {
  constructor(
    public firstName: string,
    public lastName: string,
    public address: string,
    public city: string,
    public state: string,
    public zipCode: string,
    public phone: string,
    public email: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.phone = phone;
    this.email = email;
  }

  fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  toString(): string {
    return `
Name: ${this.fullName()}
Address: ${this.address}, ${this.city}, ${this.state}, ${this.zipCode}
Phone: ${this.phone}
Email: ${this.email}
    `;
  }
}

// UC2: Add new Contact to Address Book
class AddressBook {
  name: string;
  contacts: Contact[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addContact(contact: Contact): void {
    this.contacts.push(contact);
    console.log("Contact added successfully.");
  }
}
