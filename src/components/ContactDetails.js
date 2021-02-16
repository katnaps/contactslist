import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { ContactContext } from '../contexts/ContactContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ContactDetails = () => {
    const { id } = useParams();
    const { contacts, setContacts } = useContext(ContactContext);
    const [contact, setContact] = useState([])

    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const [alert, setAlert] = useState('')

    useEffect(() => {
        axios.get(`https://contactsbookapi.herokuapp.com/api/contacts/${id}`)
            .then(response => {
                setContact(response.data)
            })
    }, [contacts.name])

    const removeContacts = () => {
        axios.delete(`https://contactsbookapi.herokuapp.com/api/contacts/${id}`)
            .then(response => {
                setContacts(response.data)
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
        let alert = document.querySelector('.alert');


        if (name === '') {
            inputName.classList.add('alert-red');

            inputName.placeholder = "Please input name";
        } else if (number === '' ) {
            inputNumber.classList.add('alert-red');

            inputNumber.placeholder = "Please input number";
        } else if (number.length > 12) {
            setTimeout(() => {
                inputNumber.classList.add('alert-red');

                inputNumber.placeholder = 'Must be smaller than 10 digits';

            })

            setNumber('');

          
        } else if (name.length > 3 && number.length < 11) {
            axios.put(`https://contactsbookapi.herokuapp.com/api/contacts/${id}`, {
                name,
                number
            })
                .then(response => {
                    setContacts(response.data);
                    
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

    return (
        <>
            <div className="details-container">
                <h3>Contact Details</h3>
                <p id="alert" className="alert-text">{alert}</p>
                <label className="name">Name:</label>
                <input
                    id="input-name"
                    type="text"
                    className="alert"
                    value={name}
                    placeholder={contact.name}
                    onChange={handleNameInput}
                />
                <label className="number">Number:</label>
                <input
                    id="input-number"
                    type="number"
                    className="alert"
                    value={number}
                    placeholder={contact.number}
                    onChange={handleNumberInput}
                />
                <input onClick={updateInfo} type="submit" value="Update" />
                <Link to='/'><button className="del-contacts" onClick={removeContacts}>Delete</button></Link>
                <Link to='/'><button className="link-back">Back</button></Link>
            </div>
        </>
    )
}

export default ContactDetails;