import { Component } from 'react'

export class ContactForm extends Component { 

    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    }

    

    handleInputChange = (event) => {

        const {name, value} = event.target;

        this.setState({
            [name]: value
        })

    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.onSave(this.state)

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        })
    }

    clearField = (field) => {
        this.setState({
            [field]: ''
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedContact !== this.props.selectedContact) {
            if (this.props.selectedContact) {
                this.setState({
                    firstName: this.props.selectedContact.firstName,
                    lastName: this.props.selectedContact.lastName,
                    email: this.props.selectedContact.email,
                    phone: this.props.selectedContact.phone
                })
            }else {
                this.setState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: ''
                })
            }
        }
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
            <button type="button" onClick={() => this.clearField('firstName')}>X</button>
            <input 
            type="text" 
            name='lastName' 
            placeholder='LastName'
            value={this.state.lastName}
            onChange={this.handleInputChange}
            />
            <button type="button" onClick={() => this.clearField('lastName')}>X</button>
            <input 
            type="text" 
            name='email' 
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleInputChange}
            />
            <button type="button" onClick={() => this.clearField('email')}>X</button>
            <input 
            type="text" 
            name='phone' 
            placeholder='Phone'
            value={this.state.phone}
            onChange={this.handleInputChange}
            />
            <button type="button" onClick={() => this.clearField('phone')}>X</button>
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