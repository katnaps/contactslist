import React from 'react';

export default () => {

    return (
        <div className="add-container">
            <h3>Add New Contact</h3>
            <div className="add-contents">
                <label>Name:</label>
                <br />
                <input type="text" placeholder="name" value="" required />
                <br />

                <label>Number</label>
                <br />

                <input type="number" placeholder="phone number" value="" required />
                <br />

                <button className="btn" type="submit">Add Contact</button>
            </div>
        </div>
    )
}