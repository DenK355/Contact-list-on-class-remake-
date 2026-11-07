import { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'
import {nanoid} from 'nanoid'
import './App.css'




function App() {
  
  const [contacts, setContacts] = useState([]);

  const [selectedContact, setSelectedContact] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!isLoaded) {
        getFromStorage();
    } else {
        saveToStorage();
    }
}, [contacts, isLoaded]);

  function getFromStorage() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
        setContacts(JSON.parse(savedContacts));
    }

    setIsLoaded(true);
}

function saveToStorage() {
    localStorage.setItem(
        'contacts',
        JSON.stringify(contacts)
    );
}


const handleContactSave = (contact) => {
    if (selectedContact === null) {
        setContacts((prevContacts) => {
            return [...prevContacts, { id: nanoid(), ...contact }];
        });
    } else {
        const updatedContact = {
            ...contact,
            id: selectedContact.id
        };

        setContacts((prevContacts) => {
            return prevContacts.map((item) => {
                if (item.id === selectedContact.id) {
                    return updatedContact;
                }

                return item;
            });
        });

        setSelectedContact(updatedContact);
    }
};
  
  const handleContactSelect = (id) => {
    const contact = contacts.find((item) => item.id === id);

    setSelectedContact(contact ?? null);
};

const handleContactNew = () => {
    setSelectedContact(null);
};

const handleContactRemove = (id) => {
    setContacts((prevContacts) => {
        return prevContacts.filter(
            (contact) => contact.id !== id
        );
    });

    setSelectedContact((prevContact) => {
        return prevContact?.id === id ? null : prevContact;
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

    )
  }


export default App
