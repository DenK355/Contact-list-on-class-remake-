import { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'
import {nanoid} from 'nanoid'
import './App.css'




function App() {
  
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');

    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  const [editingContactId, setEditingContactId] = useState(null);

useEffect(() => {
    localStorage.setItem(
        'contacts',
        JSON.stringify(contacts)
    )
}, [contacts]);

  const handleContactSave = (contact) => {
    if (editingContactId === null) {
        setContacts((prevContacts) => {
            return [
                ...prevContacts,
                {
                    id: nanoid(),
                    ...contact
                }
            ]
        })
    } else {
        setContacts((prevContacts) => {
            return prevContacts.map((item) => {
                if (item.id === editingContactId) {
                    return {
                        ...item,
                        ...contact
                    }
                } else {
                    return item
                }
            })
        })
    }

    setEditingContactId(null)
}
  
  const handleContactSelect = (id) => {

    setEditingContactId(id)

  }

const handleContactDelete = () => {
    setContacts((prevContacts) => {
        return prevContacts.filter(
            (contact) => contact.id !== editingContactId
        )
    })

    setEditingContactId(null)
}

const handleContactNew = () => {
  setEditingContactId(null)
}

const handleContactRemove = (id) => {
    setContacts((prevContacts) => {
        return prevContacts.filter(
            (contact) => contact.id !== id
        )
    })

    setEditingContactId((prevId) => {
        return prevId === id ? null : prevId
    })
}


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
