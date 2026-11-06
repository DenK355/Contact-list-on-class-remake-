import { Component } from 'react'

export class ContactForm extends Component { 

    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        previousSelectedId: null
    }

    

    handleInputChange = (event) => {

        const {name, value} = event.target;

        this.setState({
            [name]: value
        })

    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const { previousSelectedId, ...contactData } = this.state;

        this.props.onSave(contactData);
    
        if (!this.props.selectedContact) {
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            });
        }
    };

    clearField = (event) => {
        const { name } = event.target;
    
        this.setState({
            [name]: ''
        });
    };

    static getDerivedStateFromProps(props, state) {
        const selectedId = props.selectedContact?.id ?? null;
    
        if (selectedId !== state.previousSelectedId) {
            if (props.selectedContact) {
                return {
                    firstName: props.selectedContact.firstName,
                    lastName: props.selectedContact.lastName,
                    email: props.selectedContact.email,
                    phone: props.selectedContact.phone,
                    previousSelectedId: selectedId
                };
            }
    
            return {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                previousSelectedId: null
            };
        }
    
        return null;
    }

    handleNew = () => {
        this.props.onNew()
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        })
    }

  render() {
    return (
      <>
        <form  onSubmit={this.handleSubmit}>
            <input 
            type="text" 
            name='firstName' 
            placeholder='FirstName'
            value={this.state.firstName}
            onChange={this.handleInputChange}
            />
            <button type="button" name="firstName" onClick={this.clearField}>X</button>
            <input 
            type="text" 
            name='lastName' 
            placeholder='LastName'
            value={this.state.lastName}
            onChange={this.handleInputChange}
            />
            <button type="button" name="lastName" onClick={this.clearField}>X</button>
            <input 
            type="text" 
            name='email' 
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleInputChange}
            />
            <button type="button" name="email" onClick={this.clearField}>X</button>
            <input 
            type="text" 
            name='phone' 
            placeholder='Phone'
            value={this.state.phone}
            onChange={this.handleInputChange}
            />
            <button type="button" name="phone" onClick={this.clearField}>X</button>
            <button type='submit'>Save</button>
            <button type="button" onClick={this.handleNew}>
                New
            </button>
            {this.props.selectedContact && (
                <button
                    type="button"
                    onClick={this.props.onDelete}
                >
                    Delete
                </button>
            )}
        </form>
      </>
    )
  }
}

export default ContactForm