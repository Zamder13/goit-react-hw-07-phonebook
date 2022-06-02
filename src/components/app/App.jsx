import Form from "../contactForm/ContactForm";
import ContactList from "../contactsList/ContactList";
import Filter from "../filter/Filter";
import { nanoid } from "nanoid";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { contactAdded, filterContact } from "../redux/contactFormSlice";
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
} from "../redux/contactsSlice";

const App = () => {
  const { data: contacts, isFetching } = useFetchContactsQuery();
  console.log("contacts", contacts);
  const [deleteContact] = useDeleteContactMutation();
  const [addContact] = useAddContactMutation();

  // const contacts = useFetchContactsQuery();

  // const contacts = useSelector((state) => {
  //   return state.contacts.items;
  // });

  const filter = useSelector((state) => {
    return state.contacts.filter;
  });

  const dispatch = useDispatch();

  // const removeContact = (contactId) => {
  //   return dispatch(deleteContact(contactId));
  // };

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
      // dispatch(contactAdded(contact));
    }
  };

  const changeFilter = (event) => {
    const filterdName = event.target.value;
    dispatch(filterContact(filterdName));
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
