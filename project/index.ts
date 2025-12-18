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

  // UC3: Edit existing contact details
  editContact(
    firstName: string,
    lastName: string,
    updatedData: Partial<Contact>
  ): void {
    const contact = this.contacts.find(
      (c) => c.firstName === firstName && c.lastName === lastName
    );

    if (!contact) {
      console.log("Contact not found.");
      return;
    }

    Object.assign(contact, updatedData);
    console.log("Contact updated successfully.");
  }

  // UC4: Delete a contact from Address Book
  deleteContact(firstName: string, lastName: string): void {
    const index = this.contacts.findIndex(
      (c) => c.firstName === firstName && c.lastName === lastName
    );

    if (index === -1) {
      console.log("Contact not found.");
      return;
    }

    this.contacts.splice(index, 1);
    console.log("Contact deleted successfully.");
  }
}

// UC6: Add multiple Address Books to the system
class AddressBookSystem {
  addressBooks: Map<string, AddressBook> = new Map();

  addAddressBook(name: string): void {
    if (this.addressBooks.has(name)) {
      console.log("Address book with this name already exists.");
      return;
    }

    this.addressBooks.set(name, new AddressBook(name));
    console.log(`Address book '${name}' created successfully.`);
  }
}
