import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ContactReducer } from '../reducer/ContactReducer';

export const ContactContext = createContext();

const ContactContextProvider = (props) => {
    // const [contacts, dispatch] = useReducer(ContactReducer, [], () => {
    //     const localData = localStorage.getItem('contacts');
    //     return localData ? JSON.parse(localData) : [];
    // });

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get('https://contactsbookapi.herokuapp.com/api/contacts')
        .then(response => {
            setContacts(response.data)
        })
    }, [contacts.id])

    console.log(contacts)

    // useEffect(() => {
    //     axios.get('https://contactsbookapi.herokuapp.com/api/contacts')
    //         .then(response => {
    //             dispatch({
    //                 type: 'FETCH_SUCCESS', payload: response.data
    //             })
    //         })
    //     localStorage.setItem('contacts', JSON.stringify(contacts));

    // }, [contacts.id]);


    return (
        <ContactContext.Provider value={{ contacts, setContacts }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactContextProvider;