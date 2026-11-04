import { useEffect, useState } from 'react';
import {
    fetchContacts,
    createContact,
    editContact,
    removeContact
} from './store/actions/contactActions';
import { useSelector, useDispatch } from 'react-redux';
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'
import './App.css'



function App() {
  
  const contacts = useSelector((state) => state.contactsList.contacts);

  const dispatch = useDispatch();

  const [editingContactId, setEditingContactId] = useState(null);

useEffect(() => {
    dispatch(fetchContacts());
}, [dispatch]);

  const handleContactSave = (contact) => {

    if (editingContactId === null) {

        dispatch(createContact(contact));

    } else {

        dispatch(editContact(editingContactId, contact))
            .then(() => {
                setEditingContactId(null);
            });;

    }
};
  
  const handleContactSelect = (id) => {

    setEditingContactId(id)

  }

const handleContactDelete = () => {

    handleContactRemove(editingContactId);

}

const handleContactNew = () => {
  setEditingContactId(null)
}

const handleContactRemove = (id) => {
    dispatch(removeContact(id))
        .then(() => {
            if (id === editingContactId) {
                setEditingContactId(null);
            }
        }).catch((error) => {
            console.error('Не удалось удалить контакт:', error);
        });
};


const selectedContact = contacts.find(
  (contact) => contact.id === editingContactId
);

    return (
    <div className="app">

        <ContactList
            contacts={contacts}
            onSelect={handleContactSelect}
            onRemove={handleContactRemove}
        />

        <ContactForm
            onSave={handleContactSave}
            onDelete={handleContactDelete}
            onNew={handleContactNew}
            selectedContact={selectedContact}
        />
    </div>

    )
  }


export default App
