
import { useEffect, useState } from 'react';
import api from './api/contact-service';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import './App.css';

function App() {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        api.get('/contacts')
            .then((res) => {
                setContacts(res.data);
            })
            .catch((error) => {
                console.error('Ошибка загрузки контактов:', error);
            });
    }, []);

    const handleContactSave = (contact) => {
        if (selectedContact === null) {
            api.post('/contacts', contact)
                .then((res) => {
                    setContacts((prevContacts) => {
                        return [...prevContacts, res.data];
                    });
                })
                .catch((error) => {
                    console.error('Ошибка создания контакта:', error);
                });

            return;
        }

        api.patch(`/contacts/${selectedContact.id}`, contact)
            .then((res) => {
                setContacts((prevContacts) => {
                    return prevContacts.map((item) => {
                        if (item.id === selectedContact.id) {
                            return res.data;
                        }

                        return item;
                    });
                });

                setSelectedContact(res.data);
            })
            .catch((error) => {
                console.error('Ошибка обновления контакта:', error);
            });
    };

    const handleContactSelect = (id) => {
        const contact = contacts.find((item) => item.id === id);

        setSelectedContact(contact ?? null);
    };

    const handleContactNew = () => {
        setSelectedContact(null);
    };

    const handleContactRemove = (id) => {
        api.delete(`/contacts/${id}`)
            .then(() => {
                setContacts((prevContacts) => {
                    return prevContacts.filter(
                        (contact) => contact.id !== id
                    );
                });

                setSelectedContact((prevContact) => {
                    return prevContact?.id === id ? null : prevContact;
                });
            })
            .catch((error) => {
                console.error('Ошибка удаления контакта:', error);
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
