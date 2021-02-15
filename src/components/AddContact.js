import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ContactContext } from '../contexts/ContactContext';

export default () => {
    const { updateState, dispatch, contacts } = useContext(ContactContext);
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const [alert, setAlert] = useState('')
    const [alertNo, setAlertNo] = useState('')

    const handleSubmit = e => {
        e.preventDefault();

        let inputName = document.querySelector('.new-name');
        let inputNumber = document.querySelector('.new-number');


        if (number === '' && name === '') {
            inputName.placeholder = "Please input name";
            inputNumber.placeholder = "Please input number";
        } else if (number.length > 12) {
            setTimeout(() => {
                setAlertNo('Must be smaller than 10 digits')
            })

            setTimeout(() => {
                setAlertNo('')
            }, 3000)
        } else if (name.length < 10 && number.length < 11) {
            axios.post('https://contactsbookapi.herokuapp.com/api/contacts', {
                name,
                number
            })
            .then(response => {
                dispatch({
                    type: 'FETCH_SUCCESS', payload: response.data
                })
            })

            setName('');
            setNumber('');

            setTimeout(() => {
                setAlert('Successfully Updated!')
            })

            setTimeout(() => {
                setAlert('')
            }, 3000)

        }
    }

    const handleNewName = e => {
        setName(e.target.value)
    }

    const handleNewNumber = e => {
        setNumber(e.target.value)
    }

    return (
        <div className="add-container">
            <h3>Add New Contact</h3>
            <p id="alert" className="alert-text">{alert}</p>
            <p id="alert" className="alert-number">{alertNo}</p>
            <form onSubmit={handleSubmit}>
                <div className="add-contents">
                    <label>Name:</label>
                    <input
                        className="new-name"
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={handleNewName}
                    />

                    <label>Number</label>

                    <input
                        className="new-number"
                        type="number"
                        placeholder="phone number"
                        value={number}
                        onChange={handleNewNumber}
                    />

                    <button
                        className="btn"
                        onClick={updateState}
                        type="submit">Add Contact
                        </button>
                </div>
            </form>
        </div>
    )
}