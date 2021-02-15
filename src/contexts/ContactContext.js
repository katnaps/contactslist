import React, { createContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import { ContactReducer } from '../reducer/ContactReducer';

export const ContactContext = createContext();

const ContactContextProvider = (props) => {
    const [contacts, dispatch] = useReducer(ContactReducer, [], () => {
        const localData = localStorage.getItem('contacts');
        return localData ? JSON.parse(localData) : [];
    });
    const [info, setInfo] = useState(true);
    const [count, setCount] = useState(0)

    useEffect(() => {
        axios.get('https://contactsbookapi.herokuapp.com/api/contacts')
            .then(response => {
                dispatch({
                    type: 'FETCH_SUCCESS', payload: response.data
                })
            })
            localStorage.setItem('contacts', JSON.stringify(contacts));
            let countCopy = 0
            countCopy = count + 1;
            setCount(count)
    }, [contacts.id]);

    console.log(contacts)
    const updateState = () => {
        setInfo(!true);
    }

    return (
        <ContactContext.Provider value={{ info, contacts, dispatch, updateState }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactContextProvider;