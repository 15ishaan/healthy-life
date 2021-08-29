import React from 'react';
import { Component } from 'react';
import classes from './HospitalProfile.module.css';
import HospitalDoctors from './HospitalDoctors';
import {withRouter} from 'react-router-dom';
import axios from '../../Axios-url'

class HospitalProfile extends Component {

    state = {};

    componentDidMount = () => {
        const username = localStorage.getItem("username");
        axios.get("/quickstart/hospital_doctor/" + username + "/")
            .then(response => {
                console.log(response);
                if(response.status === 200) {
                    this.setHospitalDoctors(response.data);
                }
            })
            .catch(error => {
                console.log(error);
            })

        axios.get("/quickstart/profile_hospital/" + username + "/")
            .then(response => {
                console.log(response);
                if(response.status === 200) {
                    this.setHospitalDetails(response.data);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    setHospitalDoctors = (data) => {
        this.setState({
            hospitalDoctors: data
        })
    }

    setHospitalDetails = (data) => {
        this.setState({
            hospitalDetails: data
        })
    }

    editHospitalProfile = () => {
        this.props.history.push("/editHospitalProfile");
    }

    addDoctor = () => {
        this.props.history.push("/addDoctor");
    }

    render() {

        let hospitalDetails = null;
        let hospitalDoctors = null;

        if(this.state.hospitalDetails) {
            hospitalDetails = (
                <div className = {classes.content}>
                <img className = {classes.image} src = {this.state.hospitalDetails.image} alt = "xyz"></img>
                <br/><br/>
                <p className="btn btn-primary" style = {{color: 'white', fontWeight: 'normal'}} onClick = {this.editHospitalProfile}>Edit Profile</p>
                <h1><strong>{this.state.hospitalDetails.hospital_name}</strong></h1>
                <h5>Address: {this.state.hospitalDetails.street_name}</h5>
                <h5>For more information, <br/>Contact: {this.state.hospitalDetails.username}</h5>
                </div>
            );
        }
        if(this.state.hospitalDoctors) {
            hospitalDoctors = (
                    <div className = {classes.container}>
                        {this.state.hospitalDoctors.map((doctor) => (
                        <HospitalDoctors key = {doctor.id} doctorData = {doctor}/> ))}
                    </div>
                );
        }
        return (
            <div className = {classes.backdrop}>
                {hospitalDetails}
                <hr/>
                <p className="btn btn-primary" style = {{color: 'white', fontWeight: 'normal'}} onClick = {this.addDoctor}>+ Add Doctor</p>
                {hospitalDoctors}
            </div>
        );
    }
}

export default withRouter(HospitalProfile);