import React from 'react';
import classes from './BookedAppointment.module.css'
import {useHistory} from 'react-router-dom';

const BookedAppointment = () => {
    const history = useHistory();

    const backToHome = () => {
        history.push("/hospitals");
    }

    return (
        <div className= {classes.container}>
            <div className = {classes.content}>
                <h3>Your request has been sent to the selected doctor. We will notify you further details on your email: {localStorage.getItem("username")}</h3>
            </div>
            <br/><br/><br/>
            <div className = {classes.button}>
                <p className="btn btn-primary" onClick = {backToHome}>Back to Home</p>
            </div>
        </div>
    );
}

export default BookedAppointment;