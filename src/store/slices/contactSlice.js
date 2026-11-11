
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contactsState } from '../../model/initialContacts';
import api from '../../api/contact-service';

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async () => {
        const res = await api.get('/contacts');
        return res.data;
    }
);

export const createContact = createAsyncThunk(
    'contacts/createContact',
    async (contact) => {
        const res = await api.post('/contacts', contact);
        return res.data;
    }
);

export const editContact = createAsyncThunk(
    'contacts/editContact',
    async ({ id, contact }) => {
        const res = await api.patch(`/contacts/${id}`, contact);
        return res.data;
    }
);

export const removeContact = createAsyncThunk(
    'contacts/removeContact',
    async (id) => {
        await api.delete(`/contacts/${id}`);
        return id;
    }
);

const initialState = {
    contacts: contactsState
};

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.contacts = action.payload;
            })

            .addCase(createContact.fulfilled, (state, action) => {
                state.contacts.push(action.payload);
            })

            .addCase(editContact.fulfilled, (state, action) => {
                const index = state.contacts.findIndex(
                    (contact) => contact.id === action.payload.id
                );

                if (index !== -1) {
                    state.contacts[index] = action.payload;
                }
            })

            .addCase(removeContact.fulfilled, (state, action) => {
                state.contacts = state.contacts.filter(
                    (contact) => contact.id !== action.payload
                );
            });
    }
});

export default contactSlice.reducer;
