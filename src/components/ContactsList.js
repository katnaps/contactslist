import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { ContactContext } from '../contexts/ContactContext';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';


export default () => {
    const { contacts, dispatch, setInfo, info } = useContext(ContactContext);
    const history = useHistory()
    const [id, setId] = useState()

    const updateDetails = () => {
        setInfo(false);
    }   



    return contacts.length ? (
        <div className="contact-container">
            <h3>Contact List</h3>

            <ul className="contact-list">
                {contacts.map(contact => {
                    return (
                        <li className="contact-list" key={contact.id}>
                            <div>Name: {contact.name}</div>
                            <div>Number: {contact.number}</div>
                            <button className="link" onClick={() => {setInfo(false); setId(contact.id)}}><Link  to={`/contacts/${contact.id}`}>Update</Link></button>
                        </li>

                    )
                })}
            </ul>
        </div>
    ) : (
            <div>No contacts in list</div>
        )
}