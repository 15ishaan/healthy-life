import React from 'react'
import { Component } from 'react';
import axios from "../../../Axios-url"
import classes from './DoctorDetails.module.css'
import Appointment from './Appointment'
import { withRouter } from 'react-router';

class DoctorDetails extends Component {
    state = {};

    componentDidMount = () => {

        let curUrl = window.location.href;
        curUrl = curUrl.split("/").pop();
        const doctorId = curUrl.split("/").pop();

        axios.get("/quickstart/doctor/" + doctorId + "/")
            .then(response => {
                console.log(response);
                if(response.status === 200) {
                    console.log(response)
                    this.setDoctorDetails(response.data);
                }
            })
            .catch(error => {
                console.log(error);
            })

        axios.get("/quickstart/appointment/" + doctorId + "/")
        .then(response => {
            console.log(response);
            if(response.status === 200) {
                console.log(response)
                this.setAppointments(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    setDoctorDetails  = (data) => {
        this.setState({
            doctorDetails: data
        })
    }

    setAppointments  = (data) => {
        this.setState({
            appointments: data
        })
    }

    editDetailsHandler = () => {
        let curUrl = window.location.href;
        curUrl = curUrl.split("/").pop();
        const doctorId = curUrl.split("/").pop();
        this.props.history.push("/editDoctorDetails/" + doctorId);
    }

    render () {
        if(!this.state.doctorDetails) return(<div></div>);
        let appointments = null;
        if(this.state.appointments) {
            // let appointments = this.state.appointments.filter(appointments => appointments.display)
            let length = this.state.appointments.length;
            if(length) {
                appointments = (
                    <div>
                        {this.state.appointments.map((appointment, index) => (
                            <Appointment key = {index} data = {appointment} />))}
                    </div>

                );
            }
            else {
                appointments = (
                    <div>
                        <strong>No available appointments !!</strong>
                    </div>

                );
            }
        }
        return(
            <div>
                <div className ={["container", classes.emp_profile].join(' ')}>
                    <form method="post">
                        <div className ="row">
                            <div className ="col-md-4">
                                <div className = {classes.profile_img}>
                                    <img src= {"http://f0a2-112-196-163-70.ngrok.io" + this.state.doctorDetails.image} alt="Doctor-image"/>
                                </div>
                            </div>
                            <div className ="col-md-6">
                                <div className = {classes.profile_head}>
                                    <h5>
                                        {this.state.doctorDetails.first_name} {this.state.doctorDetails.last_name}
                                    </h5>
                                    <h6>
                                        {this.state.doctorDetails.Specialization}
                                    </h6>
                                    <p className="proile-rating">RANTING : <span>3/5</span></p>
                                    <ul className ="nav nav-tabs" id="myTab" role="tablist">
                                        <li className ="nav-item">
                                            <a className ="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Appointments</a>
                                        </li>
                                        <li className ="nav-item">
                                            <a className ="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">About</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className ="row">
                            <div className ="col-md-4">
                                <div className = {classes.profile_work}>
                                    <p>WORK LINK</p>
                                    <a href="">Website Link</a><br/>
                                    <a href="">Bootsnipp Profile</a><br/>
                                    <p>SKILLS</p>
                                    <a href="">Web Designer</a><br/>
                                    <a href="">Web Developer</a><br/>
                                </div>
                            </div> 
                            <div className ="col-md-8">
                                <div className ={["tab-content", classes.profile_tab].join(' ')} id="myTabContent">
                                    <div className ="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <br/>
                                        {appointments}
                                    </div>
                                    <div className ="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className ="row">
                                        <div className ="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className ="col-md-6">
                                            <p>{this.state.doctorDetails.first_name} {this.state.doctorDetails.last_name}</p>
                                        </div>
                                        </div>
                                        <div className ="row">
                                            <div className ="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className ="col-md-6">
                                                <p>123@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className ="row">
                                            <div className ="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className ="col-md-6">
                                                <p>{this.state.doctorDetails.Contact}</p>
                                            </div>
                                        </div>
                                        <div className ="row">
                                            <div className ="col-md-6">
                                                <label>Specialization</label>
                                            </div>
                                            <div className ="col-md-6">
                                                <p>{this.state.doctorDetails.Specialization}</p>
                                            </div>
                                        </div>
                                        <div className ="row">
                                            <div className ="col-md-6">
                                                <label>Experience</label>
                                            </div>
                                            <div className ="col-md-6">
                                                <p>{this.state.doctorDetails.Years_of_Experience}</p>
                                            </div>
                                        </div>
                                        <div className ="row">
                                            <div className ="col-md-6">
                                                <label>Degree</label>
                                            </div>
                                            <div className ="col-md-6">
                                                <p>{this.state.doctorDetails.Qualification}</p>
                                            </div>
                                        </div>
                                        <p className="btn btn-primary" style = {{color: 'white', fontWeight: 'normal'}} onClick = {this.editDetailsHandler}>Edit Details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>           
                </div>
            </div>
        );
    }
}

export default withRouter(DoctorDetails);