import ACTION_TYPES from '../actions/actionTypes';
import { contactsState } from '../../model/initialContacts';

const initialState = {
    contacts: contactsState,
}

const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            };
        
        case ACTION_TYPES.ADD_CONTACT:
            return {...state, contacts: [...state.contacts, action.payload]};
        
        case ACTION_TYPES.UPDATE_CONTACT:
             return {...state, 
                    contacts: state.contacts.map((contact) => {
                        return contact.id === action.payload.id ? action.payload : contact
                    })}
                    
        case ACTION_TYPES.DELETE_CONTACT:
          return {...state,
                 contacts: state.contacts.filter((contact) => {
                     return contact.id !== action.payload
                 })}  

        default:
            return state;
    }
};

export default contactsReducer;