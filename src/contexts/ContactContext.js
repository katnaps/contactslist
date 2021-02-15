import React, { createContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import { ContactReducer } from '../reducer/ContactReducer';

export const ContactContext = createContext();

const ContactContextProvider = (props) => {
    const [contacts, dispatch] = useReducer(ContactReducer, []);
    const [info, setInfo] = useState(true);


    useEffect(() => {
        axios.get('https://contactsbookapi.herokuapp.com/api/contacts')
            .then(response => {
                dispatch({
                    type: 'FETCH_SUCCESS', payload: response.data
                })
            })
    }, [contacts]);


    return (
        <ContactContext.Provider value={{ info, setInfo, contacts, dispatch }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactContextProvider;