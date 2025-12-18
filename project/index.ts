import * as fs from "fs";

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

  // UC7: Ensure no duplicate entry of the same person
  addContact(contact: Contact): void {
    const exists = this.contacts.some(
      (c) => c.fullName() === contact.fullName()
    );

    if (exists) {
      console.log("Contact with this name already exists.");
      return;
    }

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

  // UC11: Sort entries in the address book by Person's name
  sortByName(): void {
    this.contacts.sort(
      (a, b) =>
        a.firstName.localeCompare(b.firstName) ||
        a.lastName.localeCompare(b.lastName)
    );
    console.log("Contacts sorted by name.");
  }

  // UC12: Sort entries by City, State, or Zip
  sortByCity(): void {
    this.contacts.sort((a, b) => a.city.localeCompare(b.city));
    console.log("Contacts sorted by city.");
  }

  sortByState(): void {
    this.contacts.sort((a, b) => a.state.localeCompare(b.state));
    console.log("Contacts sorted by state.");
  }

  sortByZip(): void {
    this.contacts.sort((a, b) => a.zipCode.localeCompare(b.zipCode));
    console.log("Contacts sorted by zip code.");
  }

  // UC13: Read or Write Address Book with Persons Contact into File
  writeToFile(filePath: string): void {
    fs.writeFileSync(filePath, JSON.stringify(this.contacts, null, 2));
  }

  readFromFile(filePath: string): void {
    const data = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(data);
    this.contacts = parsed.map(
      (c: any) =>
        new Contact(
          c.firstName,
          c.lastName,
          c.address,
          c.city,
          c.state,
          c.zipCode,
          c.phone,
          c.email
        )
    );
  }

  // UC14: Read or Write Address Book with Persons Contact as CSV File
  writeToCSV(filePath: string): void {
    const header = "FirstName,LastName,Address,City,State,Zip,Phone,Email\n";
    const rows = this.contacts
      .map(
        (c) =>
          `${c.firstName},${c.lastName},${c.address},${c.city},${c.state},${c.zipCode},${c.phone},${c.email}`
      )
      .join("\n");

    fs.writeFileSync(filePath, header + rows);
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

  // UC8: Search person in a City or State across multiple Address Books
  searchPersonByCityOrState(city: string, state: string): Contact[] {
    const results: Contact[] = [];

    for (const book of this.addressBooks.values()) {
      for (const c of book.contacts) {
        if (c.city === city || c.state === state) {
          results.push(c);
        }
      }
    }

    return results;
  }

  // UC9: View Persons by City or State
  viewByCity(): void {
    const cityMap = new Map<string, Contact[]>();

    for (const book of this.addressBooks.values()) {
      for (const c of book.contacts) {
        if (!cityMap.has(c.city)) {
          cityMap.set(c.city, []);
        }
        cityMap.get(c.city)!.push(c);
      }
    }

    cityMap.forEach((people, city) => {
      console.log(`City: ${city}`);
      people.forEach((p) => console.log(p.toString()));
    });
  }

  viewByState(): void {
    const stateMap = new Map<string, Contact[]>();

    for (const book of this.addressBooks.values()) {
      for (const c of book.contacts) {
        if (!stateMap.has(c.state)) {
          stateMap.set(c.state, []);
        }
        stateMap.get(c.state)!.push(c);
      }
    }

    stateMap.forEach((people, state) => {
      console.log(`State: ${state}`);
      people.forEach((p) => console.log(p.toString()));
    });
  }

  // UC10: Get number of contact persons by City or State
  countByCity(): void {
    const cityCount = new Map<string, number>();

    for (const book of this.addressBooks.values()) {
      for (const c of book.contacts) {
        cityCount.set(c.city, (cityCount.get(c.city) || 0) + 1);
      }
    }

    console.log(Object.fromEntries(cityCount));
  }

  countByState(): void {
    const stateCount = new Map<string, number>();

    for (const book of this.addressBooks.values()) {
      for (const c of book.contacts) {
        stateCount.set(c.state, (stateCount.get(c.state) || 0) + 1);
      }
    }

    console.log(Object.fromEntries(stateCount));
  }
}
