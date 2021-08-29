import React, {Component} from 'react'
import classes from './HospitalProfile.module.css';
import {withRouter} from 'react-router-dom';

class HospitalDoctors extends Component {

    doctorDetails = (id) => {
        this.props.history.push("/doctorDetails/" + id);
    }

    render () {
        return (
            <div className={classes.card} style={{width: "20rem", height: "25rem"}} onClick = {() => this.doctorDetails(this.props.doctorData.id)}>
                <img src={'http://4219-112-196-163-58.ngrok.io' + this.props.doctorData.image} style={{width: "19.9rem", height: "16.8rem"}} className="card-img-top" alt="Doctor-Image"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.doctorData.first_name} {this.props.doctorData.last_name}</h5>
                    <h6 className="card-text">Specialization: {this.props.doctorData.Specialization}</h6>
                    <h6 className="card-text">For more information,<br/> Contact: {this.props.doctorData.Contact}</h6>
                </div>
            </div>
        );
    }
}

export default withRouter(HospitalDoctors);