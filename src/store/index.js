import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './slices/contactSlice';

const store = configureStore({
    reducer: {
        contactsList: contactsReducer
    }
});

export default store;
