import { useState, useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const { name } = data;
    let loginInputId = nanoid();
    data.id = loginInputId;
    console.log(data);

    let nameInContacts = contacts.find(contact => contact.name === name);

    if (nameInContacts) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts([...contacts, data]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={formSubmitHandler} />

      <h2>Contacts</h2>

      <Filter value={filter} onChange={changeFilter} />

      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </>
  );
};

export default App;
