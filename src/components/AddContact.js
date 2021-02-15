import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ContactContext } from '../contexts/ContactContext';

const AddContact = () => {
    const { dispatch } = useContext(ContactContext);
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const [alert, setAlert] = useState('')

    const handleSubmit = e => {
        e.preventDefault();

        let inputName = document.querySelector('.new-name');
        let inputNumber = document.querySelector('.new-number');
        let alert = document.querySelector('.alert');


        if (name === '') {
            inputName.classList.add('alert-red');

            inputName.placeholder = "Please input name";
        } else if (number === '') {
            inputNumber.classList.add('alert-red');

            inputNumber.placeholder = "Please input number";
        } else if (number.length >= 11) {
            setTimeout(() => {
                inputNumber.classList.add('alert-red');

                inputNumber.placeholder = 'Must be smaller than 10 digits';
            })

            setNumber('');

        } else if (name.length >= 3 && number !== '') {
            axios.post('https://contactsbookapi.herokuapp.com/api/contacts', {
                name,
                number
            })
                .then(response => {
                    dispatch({
                        type: 'FETCH_SUCCESS', payload: response.data
                    })

                    setTimeout(() => {
                        alert.classList.remove('alert-red')
                        setAlert('Successfully Updated!')
                    })

                    setTimeout(() => {
                        setAlert('')
                    }, 3000)

                })
                .then(() => {
                    inputName.classList.remove('alert-red');
                    inputNumber.classList.remove('alert-red');
                    inputNumber.placeholder = 'phone number';

                    setName('');
                    setNumber('');
                })

        } else {
            setTimeout(() => {
                alert.classList.remove('alert-text')
                alert.classList.add('alert-red')

                inputName.placeholder = "Must be more than 3 letters";

            })

            setTimeout(() => {
                setAlert('')
            }, 5000)
            setName('');
            setNumber('');
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
            <form onSubmit={handleSubmit}>
                <div className="add-contents">
                    <label>Name:</label>
                    <input
                        className="new-name alert"
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={handleNewName}
                    />

                    <label>Number</label>

                    <input
                        className="new-number alert"
                        type="number"
                        placeholder="phone number"
                        value={number}
                        onChange={handleNewNumber}
                    />

                    <button
                        className="btn"
                        type="submit">Add Contact
                        </button>
                </div>
            </form>
        </div>
    )
}

export default AddContact;