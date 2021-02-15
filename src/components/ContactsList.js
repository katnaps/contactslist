import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { ContactContext } from '../contexts/ContactContext';
import { Link } from 'react-router-dom';

export default () => {
    const { contacts, dispatch, setInfo, info } = useContext(ContactContext);
    const [id, setId] = useState()

    const handleRemoveContact = () => {
        axios.delete(`https://contactsbookapi.herokuapp.com/api/contacts/${id}`)
            .then(response => {
                dispatch({
                    type: 'FETCH_SUCCESS', payload: response.data
                })
            })
    }

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
                                onClick={() => {
                                    setId(contact.id)
                                }}>
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