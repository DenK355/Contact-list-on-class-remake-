
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    fetchContacts,
    createContact,
    editContact,
    removeContact
} from './store/slices/contactSlice';

import {
    Box,
    Container,
    Typography,
    CssBaseline,
    Stack,
    Chip
} from '@mui/material';

import ContactsIcon from '@mui/icons-material/Contacts';

import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';

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
                const result = await dispatch(
                    createContact(contact)
                );

                if (result.error) {
                    throw new Error(result.error.message);
                }

                return result.payload;
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

            return result.payload;

        } catch (error) {
            console.error(
                'Ошибка сохранения контакта:',
                error
            );

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
            const result = await dispatch(
                removeContact(id)
            );

            if (result.error) {
                throw new Error(result.error.message);
            }

            setSelectedContact((prevContact) => {
                return prevContact?.id === id
                    ? null
                    : prevContact;
            });

        } catch (error) {
            console.error(
                'Ошибка удаления контакта:',
                error
            );
        }
    };

    return (
        <>
            <CssBaseline />

            <Box
                component="main"
                sx={{
                    minHeight: '100vh',
                    bgcolor: '#f5f7fb',
                    py: { xs: 3, md: 6 }
                }}
            >
                <Container maxWidth="lg">
                    <Stack
                        direction={{
                            xs: 'column',
                            sm: 'row'
                        }}
                        spacing={2}
                        sx={{
                            justifyContent: 'space-between',
                            alignItems: {
                                xs: 'flex-start',
                                sm: 'center'
                            },
                            mb: 4
                        }}
                    >
                        <Box>
                            <Stack
                                direction="row"
                                spacing={1.5}
                                sx={{
                                    alignItems: 'center',
                                    mb: 1
                                }}
                            >
                                <ContactsIcon
                                    sx={{
                                        fontSize: 36,
                                        color: 'primary.main'
                                    }}
                                />

                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700
                                    }}
                                >
                                    Contact List
                                </Typography>
                            </Stack>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary'
                                }}
                            >
                                Управление вашими контактами
                            </Typography>
                        </Box>

                        <Chip
                            label={`Всего контактов: ${contacts.length}`}
                            color="primary"
                            variant="outlined"
                            sx={{
                                fontWeight: 600,
                                bgcolor: 'white'
                            }}
                        />
                    </Stack>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                md: 'minmax(0, 1fr) minmax(0, 1fr)'
                            },
                            gap: 3,
                            alignItems: 'start'
                        }}
                    >
                        <ContactList
                            contacts={contacts}
                            onSelect={handleContactSelect}
                            onRemove={handleContactRemove}
                            selectedContact={selectedContact}
                        />

                        <ContactForm
                            key={selectedContact?.id ?? 'new'}
                            onSave={handleContactSave}
                            onDelete={() => {
                                if (selectedContact) {
                                    handleContactRemove(
                                        selectedContact.id
                                    );
                                }
                            }}
                            onNew={handleContactNew}
                            selectedContact={selectedContact}
                        />
                    </Box>

                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.disabled',
                            textAlign: 'center',
                            mt: 5
                        }}
                    >
                        Contact Manager · Redux Toolkit
                    </Typography>
                </Container>
            </Box>
        </>
    );
}

export default App;
