
import { useEffect, useState } from 'react';
import {
    fetchContacts,
    createContact,
    editContact,
    removeContact
} from './store/slices/contactSlice';
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

    const handleContactSave = async (contact) => {
        try {
            if (selectedContact === null) {
                const result = await dispatch(createContact(contact));

                if (result.error) {
                    throw new Error(result.error.message);
                }

                return;
            }

            const contactId = selectedContact.id;

            const result = await dispatch(
                editContact({
                    id: contactId,
                    contact
                })
            );

            if (result.error) {
                throw new Error(result.error.message);
            }

            setSelectedContact((prevContact) => {
                if (prevContact?.id !== contactId) {
                    return prevContact;
                }

                return result.payload;
            });

        } catch (error) {
            console.error('Ошибка сохранения контакта:', error);
            throw error;
        }
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

    const handleContactRemove = async (id) => {
        try {
            const result = await dispatch(removeContact(id));

            if (result.error) {
                throw new Error(result.error.message);
            }

            setSelectedContact((prevContact) => {
                return prevContact?.id === id
                    ? null
                    : prevContact;
            });

        } catch (error) {
            console.error('Ошибка удаления контакта:', error);
        }
    };

    return (
        <div className="app">
            <ContactList
                contacts={contacts}
                onSelect={handleContactSelect}
                onRemove={handleContactRemove}
            />

            <ContactForm
                key={selectedContact?.id ?? 'new'}
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
