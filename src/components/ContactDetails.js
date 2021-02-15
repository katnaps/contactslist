import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { ContactContext } from '../contexts/ContactContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default () => {
    const { id } = useParams();
    const { updateState, dispatch  } = useContext(ContactContext);
    const [contact, setContact] = useState([])

    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const [alert, setAlert] = useState('')
    const [alertNo, setAlertNo] = useState('')

    useEffect(() => {
        axios.get(`https://contactsbookapi.herokuapp.com/api/contacts/${id}`)
            .then(response => {
                // console.log(response.data)
                setContact(response.data)
            })
    }, [])

    const removeContacts = () => {
        axios.delete(`https://contactsbookapi.herokuapp.com/api/contacts/${id}`)
        .then(response => {
            dispatch({
                type: 'FETCH_SUCCESS', payload: response.data
            })
        })
    }

    const handleNameInput = e => {
        setName(e.target.value)
    }

    const handleNumberInput = e => {
        setNumber(e.target.value)
    }

    const updateInfo = () => {
        let inputName = document.getElementById('input-name');
        let inputNumber = document.getElementById('input-number');

        
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
        } else if ( name.length < 10 && number.length < 11 ) {
            axios.put(`https://contactsbookapi.herokuapp.com/api/contacts/${id}`, {
            name,
            number
        })
            .then(response => {
                setName('')
                setNumber('')

                setTimeout(() => {
                    setAlert('Successfully Updated!')
                })

                setTimeout(() => {
                    setAlert('')
                }, 3000)
            })
        }
    }

    return (
        <>
            <div className="details-container">
                <h3>Contact Details</h3>
                <p id="alert" className="alert-text">{alert}</p>
                <p id="alert" className="alert-number">{alertNo}</p>
                <label className="name">Name:</label>
                <input
                    id="input-name"
                    type="text"
                    value={name}
                    placeholder={contact.name}
                    onChange={handleNameInput}
                />
                <label className="number">Number:</label>
                <input
                    id="input-number"
                    type="number"
                    value={number}
                    placeholder={contact.number}
                    onChange={handleNumberInput}
                />
                <input onClick={updateInfo} type="submit" value="Update" />
                <button className="del-name" onClick={removeContacts}><Link to='/'>Delete</Link></button>
                <button className="link-back" onClick={updateState}><Link to='/'>Back</Link></button>
            </div>
        </>
    )
}