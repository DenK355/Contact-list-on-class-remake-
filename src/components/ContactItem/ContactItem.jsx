import { Component } from 'react'

export class ContactItem extends Component {
  render() {

    return (
      <>
            <li onClick={() => this.props.onSelect(this.props.id)}>
                {this.props.firstName} {this.props.lastName}
                <button onClick={(event) => {

                    event.stopPropagation()
                    this.props.onRemove(this.props.id)
                    
                    }} type="button">X</button>
            </li>
      </>
    )
  }
}

export default ContactItem