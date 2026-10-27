
function ContactItem(props) {

    return (
      <>
            <li onClick={() => props.onSelect(props.id)}>
                {props.firstName} {props.lastName}
                <button onClick={(event) => {

                    event.stopPropagation()
                    props.onRemove(props.id)
                    
                    }} type="button">X</button>
            </li>
      </>
    )
  }

export default ContactItem