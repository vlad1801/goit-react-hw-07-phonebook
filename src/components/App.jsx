import { PhoneForm } from './PhoneForm';
import { ContactList } from './ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from 'redux/phoneBookReducer';
import { useEffect } from 'react';
import { Loading } from 'notiflix';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from 'redux/contacts.selectors';
import { selectFilter } from 'redux/filter.selectors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const addConatct = ({ event, name, phone }) => {
    event.preventDefault();
    if (
      contacts.some(contact => contact.name === name || contact.phone === phone)
    ) {
      toast.error('Oops, this number is already exist!', {
        position: 'top-center',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
    console.log(0);
    dispatch(addContactThunk({ name, phone, id: nanoid() }));
  };

  const getFilteredContacts = filter => {
    try {
      return contacts.filter(
        contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase()) ||
          contact.phone.includes(filter)
      );
    } catch (err) {
      return contacts;
    }
  };

  const handleDelete = id => {
    dispatch(deleteContactThunk(id));
  };

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);
  // LOADING
  useEffect(() => {
    if (isLoading) {
      Loading.standard();
    } else {
      Loading.remove();
    }
  }, [isLoading]);

  useEffect(() => {
    if (error !== null) {
      toast.error(error, {
        position: 'top-center',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }, [error]);

  return (
    <>
      <h1>Phonebook</h1>
      <PhoneForm handleAddNumber={addConatct} />
      <h2>Contacts</h2>
      <Filter filter={filter} contacts={contacts} />
      <ContactList
        contacts={getFilteredContacts(filter) ?? []}
        handleDelete={handleDelete}
      />
      <ToastContainer />
    </>
  );
};
