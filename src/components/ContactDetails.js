import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { ContactContext } from '../contexts/ContactContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default () => {
    const { id } = useParams();
    const { contacts, dispatch, setInfo, info } = useContext(ContactContext);
    const [contact, setContact] = useState([])

    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const [alert, setAlert] = useState('')

    useEffect(() => {
        axios.get(`https://contactsbookapi.herokuapp.com/api/contacts/${id}`)
            .then(response => {
                // console.log(response.data)
                setContact(response.data)
            })
    }, [])

    const updateState = () => {
        setInfo(true);
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
        let alert = document.getElementById('alert');


        if (name || number === '') {
            inputName.placeholder = "Please input name";
            inputNumber.placeholder = "Please input number";
        }

        axios.put(`https://contactsbookapi.herokuapp.com/api/contacts/${id}`, {
            name,
            number
        })
            .then(response => {
                setInfo(true)
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


    return (
        <>
            <div className="details-container">
                <h3>Contact Details</h3>
                <p id="alert" className="alert-text">{alert}</p>
                <label className="name">Name:</label>
                <input id="input-name" type="text" value={name} placeholder={contact.name} onChange={handleNameInput} />
                <label className="number">Number:</label>
                <input id="input-number" type="number" value={number} placeholder={contact.number} onChange={handleNumberInput} />
                <input onClick={updateInfo} type="submit" value="Update" />
                <button className="link" onClick={updateState}><Link  to='/'>Back</Link></button>
            </div>
        </>
    )
}