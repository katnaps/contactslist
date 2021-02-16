import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ContactContext = createContext();

const ContactContextProvider = (props) => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get('https://contactsbookapi.herokuapp.com/api/contacts')
        .then(response => {
            setContacts(response.data)
        })
    }, [contacts.id])

    return (
        <ContactContext.Provider value={{ contacts, setContacts }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactContextProvider;