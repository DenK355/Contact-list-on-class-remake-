
import { useEffect, useState } from 'react';
import {
    fetchContacts,
    createContact,
    editContact,
    removeContact
} from './store/actions/contactActions';
import { useSelector, useDispatch } from 'react-redux';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import './App.css';

function App() {
    const contacts = useSelector(
        (state) => state.contactsList.contacts
    );

    const dispatch = useDispatch();

    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleContactSave = (contact) => {
      if (selectedContact === null) {
          return dispatch(createContact(contact));
      }
  
      const contactId = selectedContact.id;
  
      return dispatch(editContact(contactId, contact))
          .then((updatedContact) => {
              setSelectedContact((prevContact) => {
                  if (prevContact?.id !== contactId) {
                      return prevContact;
                  }
  
                  return updatedContact;
              });
          })
          .catch((error) => {
              console.error('Не удалось обновить контакт:', error);
              throw error;
          });
  };

    const handleContactSelect = (id) => {
        const contact = contacts.find(
            (item) => item.id === id
        );

        setSelectedContact(contact ?? null);
    };

    const handleContactNew = () => {
        setSelectedContact(null);
    };

    const handleContactRemove = (id) => {
        dispatch(removeContact(id))
            .then(() => {
                setSelectedContact((prevContact) => {
                    return prevContact?.id === id
                        ? null
                        : prevContact;
                });
            })
            .catch((error) => {
                console.error(
                    'Не удалось удалить контакт:',
                    error
                );
            });
    };

    return (
        <div className="app">
            <ContactList
                contacts={contacts}
                onSelect={handleContactSelect}
                onRemove={handleContactRemove}
            />

            <ContactForm
                onSave={handleContactSave}
                onDelete={() => {
                    if (selectedContact) {
                        handleContactRemove(selectedContact.id);
                    }
                }}
                onNew={handleContactNew}
                selectedContact={selectedContact}
            />
        </div>
    );
}

export default App;
