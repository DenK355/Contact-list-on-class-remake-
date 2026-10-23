import { Component } from 'react'
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'
import {nanoid} from 'nanoid'
import './App.css'



class App extends Component {
  
  state = {

    contacts : [],

    editingContactId: null

  }

  handleContactSave = (contact) => {
    this.setState((state) => {
        if (state.editingContactId === null) {
            return {
                contacts: [
                    ...state.contacts,
                    {
                        id: nanoid(),
                        ...contact
                    }
                ],
                editingContactId: null
            }
        } else {
            return {
                contacts: state.contacts.map((item) => {
                    if (item.id === state.editingContactId) {
                        return {
                            ...item,
                            ...contact
                        }
                    } else {
                        return item
                    }
                }),
                editingContactId: null
            }
        }
    })
}
  
  handleContactSelect = (id) => {

    this.setState({
      editingContactId: id
    })

  }

  handleContactDelete = () => {
    this.setState((state) => {
        return {
            contacts: state.contacts.filter(
                (contact) => contact.id !== state.editingContactId
            ),
            editingContactId: null
        }
    })
}

handleContactNew = () => {
  this.setState({
      editingContactId: null
  })
}

handleContactRemove = (id) => {
  this.setState((state) => {
      return {
          contacts: state.contacts.filter(
              (contact) => contact.id !== id
          ),

          editingContactId: id === state.editingContactId
          ? null
          : state.editingContactId
      }
  })
}

componentDidUpdate(prevProps, prevState) {
  if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
          'contacts',
          JSON.stringify(this.state.contacts)
      )
  }
}

componentDidMount() {
  const savedContacts = localStorage.getItem('contacts');

  if (savedContacts) {
      this.setState({
          contacts: JSON.parse(savedContacts)
      });
  }
}

  render(){
    const selectedContact = this.state.contacts.find(
      (contact) => contact.id === this.state.editingContactId
    );
    return (
    <div className="app">

        <ContactList
            contacts={this.state.contacts}
            onSelect={this.handleContactSelect}
            onRemove={this.handleContactRemove}
        />

        <ContactForm
            onSave={this.handleContactSave}
            onDelete={this.handleContactDelete}
            onNew={this.handleContactNew}
            selectedContact={selectedContact}
        />
    </div>

    )
  }
  
}

export default App
