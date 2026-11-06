import { Component } from 'react'
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'
import {nanoid} from 'nanoid'
import './App.css'



class App extends Component {
  
  state = {

    contacts : [],

    editingContactId: null,

    selectedContact: null

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
                ]
            };
        }

        const updatedContact = {
            ...contact,
            id: state.editingContactId
        };

        return {
            contacts: state.contacts.map((item) => {
                if (item.id === state.editingContactId) {
                    return updatedContact;
                }

                return item;
            }),
            selectedContact: updatedContact
        };
    });
};
  
handleContactSelect = (id) => {
  this.setState({
      editingContactId: id,
      selectedContact: this.state.contacts.find(
          (contact) => contact.id === id
      )
  });
};

handleContactNew = () => {
  this.setState({
      editingContactId: null,
      selectedContact: null
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
          : state.editingContactId,

          selectedContact: id === state.editingContactId
          ? null
          : state.selectedContact
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
    return (
    <div className="app">

        <ContactList
            contacts={this.state.contacts}
            onSelect={this.handleContactSelect}
            onRemove={this.handleContactRemove}
        />

        <ContactForm
            onSave={this.handleContactSave}
            onDelete={() => this.handleContactRemove(this.state.editingContactId)}
            onNew={this.handleContactNew}
            selectedContact={this.state.selectedContact}
        />
    </div>

    )
  }
  
}

export default App
