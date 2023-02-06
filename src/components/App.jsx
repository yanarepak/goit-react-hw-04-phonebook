import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './Contact/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

const LOKAL_KEY = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(LOKAL_KEY)) ?? []
  );

  const [filter, setFilter] = useState('');
  useEffect(() => {
    localStorage.setItem(LOKAL_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const contact = {
      id: nanoid(),
      number: newContact.number,
      name: newContact.name,
    };

    setContacts(contacts => {
      return contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
        ? alert(`${newContact.name} is already in contacts`)
        : [contact, ...contacts];
    });
  };

  const onFilter = element => {
    setFilter(element.currentTarget.value);
  };

  const deleteContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  const filterContactsList = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ width: '450px', margin: '0 auto' }}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onFilter={onFilter} />
      <ContactList
        contacts={filterContactsList}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
