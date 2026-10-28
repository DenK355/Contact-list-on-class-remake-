import { useEffect, useState } from 'react';
import api from './api/contact-service';
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'
import './App.css'



function App() {
  
  const [contacts, setContacts] = useState([]);

  const [editingContactId, setEditingContactId] = useState(null);

useEffect(() => {
    api.get('/contacts')
        .then((res) => {
            setContacts(res.data)
        }).catch((error) => {
            console.error('Ошибка загрузки контактов:', error);
        });
}, []);

  const handleContactSave = (contact) => {
    if (editingContactId === null) {
        api.post('/contacts', contact)
            .then((res) => {
                setContacts((prevContacts) => {
                    return [
                        ...prevContacts,
                        res.data
                    ];
                });

                setEditingContactId(null);
            })
            .catch((error) => {
                console.error('Ошибка создания контакта:', error);
            });

    } else {
        api.patch(`/contacts/${editingContactId}`, contact)
            .then((res) => {
                setContacts((prevContacts) => {
                    return prevContacts.map((item) => {
                        if (item.id === editingContactId) {
                            return res.data;
                        } else {
                            return item;
                        }
                    });
                });

                setEditingContactId(null);
            })
            .catch((error) => {
                console.error('Ошибка обновления контакта:', error);
            });
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
    api.delete(`/contacts/${id}`)
        .then(() => {
            setContacts((prevContacts) => {
                return prevContacts.filter(
                    (contact) => contact.id !== id
                );
            });

            setEditingContactId((prevId) => {
                return prevId === id ? null : prevId;
            });
        })
        .catch((error) => {
            console.error('Ошибка удаления контакта:', error);
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
