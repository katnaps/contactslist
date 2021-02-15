import React, { useContext, useEffect } from 'react';
import { ContactContext } from '../contexts/ContactContext';
import ContactDetails from './ContactDetails';
import ContactsList from './ContactsList';
import { Route, Switch } from "react-router-dom"


export default () => {
    const { info, setInfo } = useContext(ContactContext);

    const updateDetails = () => {
        setInfo(false);
    }

    return (
        <>
        <Switch>
	        <Route exact path="/" component={ContactsList}/>
	        <Route path="/contacts/:id" component={ContactDetails} />
	      </Switch>
            {/* {info ? <ContactsList /> : <ContactDetails />} */}
        </>
    )
}