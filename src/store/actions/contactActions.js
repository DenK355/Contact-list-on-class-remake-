import ACTION_TYPES from './actionTypes';
import api from '../../api/contact-service';

export const setContacts = (contacts) => {
    return {
        type: ACTION_TYPES.SET_CONTACTS,
        payload: contacts
    };
};

export const addContact = (contact) => {
    return {
        type: ACTION_TYPES.ADD_CONTACT,
        payload: contact
    };
};

export const updateContact = (contact) => {
    return {
        type: ACTION_TYPES.UPDATE_CONTACT,
        payload: contact
    };
};

export const deleteContact = (id) => {
    return {
        type: ACTION_TYPES.DELETE_CONTACT,
        payload: id
    };
};

export const fetchContacts = () => {
    return (dispatch) => {
        api.get('/contacts')
        .then((res) => {
            dispatch(setContacts(res.data));
        }).catch((error) => {
            console.error('Ошибка загрузки контактов:', error);
        });
    };
};

export const createContact = (contact) => {
    return (dispatch) => {
            return api.post('/contacts', contact)
                .then((res) => {
                    dispatch(addContact(res.data));
                    
                })
                .catch((error) => {
                    console.error('Ошибка создания контакта:', error);
                    throw error;
                });
            }  
};

export const editContact = (id, contact) => {
    return (dispatch) => {
        return api.patch(`/contacts/${id}`, contact)
            .then((res) => {
                dispatch(updateContact(res.data));

                return res.data;
            })
            .catch((error) => {
                console.error('Ошибка обновления контакта:', error);
                throw error;
            });
    };
};

export const removeContact = (id) => {
    return (dispatch) => {
        return  api.delete(`/contacts/${id}`)
            .then(() => {
                dispatch(deleteContact(id))
            }).catch((error) => {
                console.error('Ошибка удаления контакта:', error);
                throw error
            });
    };
};