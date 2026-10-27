import { useState, useEffect } from 'react';

function ContactForm(props) { 

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    })

const handleInputChange = (event) => {

        const {name, value} = event.target;

        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

const handleSubmit = (event) => {
        event.preventDefault();

        props.onSave(formData)

        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        })
    }

const clearField = (field) => {

        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [field]: ''
            }
        })
    }

    useEffect(() => {
        if (props.selectedContact) {
            setFormData({
                firstName: props.selectedContact.firstName,
                lastName: props.selectedContact.lastName,
                email: props.selectedContact.email,
                phone: props.selectedContact.phone
            })
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            })
        }
    }, [props.selectedContact])

const handleNew = () => {
        props.onNew()

        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        })
    }

    return (
      <>
        <form  onSubmit={handleSubmit}>
            <input 
            type="text" 
            name='firstName' 
            placeholder='FirstName'
            value={formData.firstName}
            onChange={handleInputChange}
            />
            <button type="button" onClick={() => clearField('firstName')}>X</button>
            <input 
            type="text" 
            name='lastName' 
            placeholder='LastName'
            value={formData.lastName}
            onChange={handleInputChange}
            />
            <button type="button" onClick={() => clearField('lastName')}>X</button>
            <input 
            type="text" 
            name='email' 
            placeholder='Email'
            value={formData.email}
            onChange={handleInputChange}
            />
            <button type="button" onClick={() => clearField('email')}>X</button>
            <input 
            type="text" 
            name='phone' 
            placeholder='Phone'
            value={formData.phone}
            onChange={handleInputChange}
            />
            <button type="button" onClick={() => clearField('phone')}>X</button>
            <button type='submit'>Save</button>
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
      </>
    )
  }

export default ContactForm