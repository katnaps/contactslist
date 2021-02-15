import React from 'react';
import ContactDetails from './ContactDetails';
import ContactsList from './ContactsList';
import { Route, Switch } from "react-router-dom"


export default () => {

    return (
        <>
        <Switch>
	        <Route exact path="/" component={ContactsList}/>
	        <Route path="/contacts/:id" component={ContactDetails} />
	      </Switch>
        </>
    )
}