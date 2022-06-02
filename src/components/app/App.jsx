import Form from "../contactForm/ContactForm";
import ContactList from "../contactsList/ContactList";
import Filter from "../filter/Filter";
import { nanoid } from "nanoid";
import "./App.css";

import {
  useFetchContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
} from "../redux/contactsSlice";
import Spinner from "../Spinner/Spinner";
import { useState } from "react";

const App = () => {
  const { data: contacts, isFetching } = useFetchContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  const [addContact] = useAddContactMutation();

  const [filter, setFilter] = useState("");

  const setContact = (name, number) => {
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      const contact = {
        id: nanoid(),
        name: name,
        number: number,
      };

      addContact(contact);
    }
  };

  const changeFilter = (event) => {
    const filterdName = event.target.value;
    setFilter(filterdName);
  };

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Form onSubmit={setContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      {isFetching && <Spinner />}
      {contacts && !isFetching && (
        <ContactList
          persons={filteredContacts(contacts)}
          onDeleteContact={deleteContact}
        />
      )}
    </>
  );
};

export default App;
