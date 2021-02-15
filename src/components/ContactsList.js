import React, { useContext } from 'react';
import { ContactContext } from '../contexts/ContactContext';
import { Link } from 'react-router-dom';

const ContactsList = () => {
    const { contacts } = useContext(ContactContext);

    console.log(contacts)

    return contacts.length ? (
        <div className="contact-container">
            <h3>Contact List</h3>

            <ul className="contact-list">
                {contacts.map(contact => {
                    return (
                        <li className="contact-list" key={contact.id}>
                            <div>
                                <p>Name:</p>
                                <span>{contact.name}</span>
                            </div>
                            <div>
                                <p>Number:</p>
                                <span id="phone">{contact.number}</span>
                            </div>
                            <button
                                className="link"
                            >
                                <Link to={`/contacts/${contact.id}`}>Update</Link>
                            </button>
                        </li>

                    )
                })}
            </ul>
        </div>
    ) : (
            <div className="contact-container">
                <h3>No contacts in list</h3>
            </div>
        )
}

export default ContactsList;