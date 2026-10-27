import ContactItem from '../ContactItem/ContactItem';


function ContactList(props) {
  
    return (
        <>
        <ul>
          {props.contacts.map((contact) => {
            return (
              
                <ContactItem
                key={contact.id}
                firstName={contact.firstName}
                lastName={contact.lastName}
                onSelect={props.onSelect}
                id={contact.id}
                onRemove={props.onRemove}
              />
    
            )
          })}
        </ul>
          
        </>
     
     
    )
  }

export default ContactList