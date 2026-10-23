import { Component } from 'react'
import ContactItem from '../ContactItem/ContactItem';


export class ContactList extends Component {
  
  render() {
    return (
        <>
        <ul>
          {this.props.contacts.map((contact) => {
            return (
              
                <ContactItem
                key={contact.id}
                firstName={contact.firstName}
                lastName={contact.lastName}
                onSelect={this.props.onSelect}
                id={contact.id}
                onRemove={this.props.onRemove}
              />
    
            )
          })}
        </ul>
          
        </>
     
     
    )
  }
}

export default ContactList