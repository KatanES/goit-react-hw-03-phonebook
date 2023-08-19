import { Component } from 'react';
import { PhoneForm } from './Phonebook/PhoneForm';
import { FormList } from './Phonebook/FormList';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    contactFilter: '',
  };

  componentDidMount() {
    console.log('componentDidMount');
    const savedContacts = localStorage.getItem('contacts-list');
    console.log(savedContacts);
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      const savedContactFilter = localStorage.getItem('contact-filter');

      this.setState({
        contacts: parsedContacts,
        contactFilter: savedContactFilter || '', // оновлення фільтру
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('this.state:', this.state.contacts);
    console.log('PrevState:', prevState.contacts);
    console.log(prevState.contacts === this.state.contacts);
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        'contacts-list',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  addItem = newItem => {
    const existingContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newItem.name.toLowerCase()
    );

    if (existingContact) {
      alert(`${newItem.name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: newItem.name,
      number: newItem.number,
    };

    this.setState(
      prevState => ({
        contacts: [...prevState.contacts, newContact],
      }),
      () => {
        // Після оновлення стану
        localStorage.setItem(
          'contacts-list',
          JSON.stringify(this.state.contacts)
        );
      }
    );
  };

  changeContactFilter = newFilter => {
    this.setState({
      contactFilter: newFilter,
    });
  };

  deleteContact = contactId => {
    this.setState(
      prevState => ({
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      }),
      () => {
        // Після оновлення стану
        localStorage.setItem(
          'contacts-list',
          JSON.stringify(this.state.contacts)
        );
      }
    );
  };

  render() {
    const { contacts, contactFilter } = this.state;
    const visibleContactItems = contacts.filter(contact =>
      contact.name.toLowerCase().includes(contactFilter.toLowerCase())
    );
    return (
      <div>
        <PhoneForm onAdd={this.addItem} />
        <FormList
          contacts={visibleContactItems}
          contactFilter={contactFilter}
          onChangeFilter={this.changeContactFilter}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export const ContactFilter = ({ value, onChange }) => {
  return (
    <div>
      <h2>Find contacts by name</h2>
      <input
        type="text"
        value={value}
        onChange={evt => onChange(evt.target.value)}
      ></input>
    </div>
  );
};
