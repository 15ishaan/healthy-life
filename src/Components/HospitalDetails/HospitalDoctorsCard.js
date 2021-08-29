import React, {Component} from 'react'
import classes from './HospitalDetails.module.css';
import {withRouter} from 'react-router-dom';

class HospitalDoctorsCard extends Component {

    doctorProfile = (id) => {
        this.props.history.push("/hospitalDetails/doctor/" + id);
    }

    render () {
        return (
            <div className={classes.card} style={{width: "20rem", height: "25rem"}}>
                <img src={'http://c6dc-112-196-163-64.ngrok.io' + this.props.doctorData.image} style={{width: "19.9rem", height: "19rem"}} className="card-img-top" alt="Hospital-Image"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.doctorData.first_name} {this.props.doctorData.last_name}</h5>
                    <h6 className="card-text">Specialization: {this.props.doctorData.Specialization}</h6>
                    <h6 className="card-text">For more information,<br/> Contact: {this.props.doctorData.Contact}</h6>
                    <p className="btn btn-primary" onClick = {() => this.doctorProfile(this.props.doctorData.id)}>View Profile</p>
                </div>
            </div>
        );
    }
}

export default withRouter(HospitalDoctorsCard);