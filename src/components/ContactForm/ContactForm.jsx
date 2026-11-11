
import { useState } from 'react';

const emptyForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
};

function ContactForm(props) {
    const [formData, setFormData] = useState(() => {
        if (props.selectedContact) {
            return {
                firstName: props.selectedContact.firstName,
                lastName: props.selectedContact.lastName,
                email: props.selectedContact.email,
                phone: props.selectedContact.phone
            };
        }

        return { ...emptyForm };
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isCreating = !props.selectedContact;

        try {
            await props.onSave(formData);

            if (isCreating) {
                setFormData({ ...emptyForm });
            }
        } catch (error) {
            console.error('Не удалось сохранить контакт:', error);
        }
    };

    const clearField = (event) => {
        const field = event.currentTarget.name;

        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [field]: ''
            };
        });
    };

    const handleNew = () => {
        props.onNew();
        setFormData({ ...emptyForm });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstName"
                placeholder="FirstName"
                value={formData.firstName}
                onChange={handleInputChange}
            />
            <button
                type="button"
                name="firstName"
                onClick={clearField}
            >
                X
            </button>

            <input
                type="text"
                name="lastName"
                placeholder="LastName"
                value={formData.lastName}
                onChange={handleInputChange}
            />
            <button
                type="button"
                name="lastName"
                onClick={clearField}
            >
                X
            </button>

            <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
            />
            <button
                type="button"
                name="email"
                onClick={clearField}
            >
                X
            </button>

            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
            />
            <button
                type="button"
                name="phone"
                onClick={clearField}
            >
                X
            </button>

            <button type="submit">Save</button>

            <button type="button" onClick={handleNew}>
                New
            </button>

            {props.selectedContact && (
                <button
                    type="button"
                    onClick={props.onDelete}
                >
                    Delete
                </button>
            )}
        </form>
    );
}

export default ContactForm;
