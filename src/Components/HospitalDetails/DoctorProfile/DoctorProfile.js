import React, {Component} from 'react';
import classes from './DoctorProfile.module.css'
// import Backdrop from '../../../Assets/images/backdrop.jpg'
import { withRouter } from 'react-router';
import axios from '../../../Axios-url'
import { Dropdown } from 'bootstrap';

class DoctorProfile extends Component {
    state = {};

    componentDidMount = () => {

        let curUrl = window.location.href;
        curUrl = curUrl.split("/").pop();
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
    }

    setDoctorDetails  = (data) => {
        this.setState({
            doctorDetails: data
        })
    }

    bookAppointmentHandler = () => {
        const username = localStorage.getItem("username");
        if(username === null) {
            this.props.history.push("/login")
        }
        else {
    
            let curUrl = window.location.href;
            curUrl = curUrl.split("/").pop();
            curUrl = curUrl.split("/").pop();
            const doctorId = curUrl.split("/").pop();

            const data = {username: username, status: "null"};

            axios.post("/quickstart/make_appointment/", data)
                .then(response => {
                    if(response.status === 201) {
                        this.props.history.push("/bookedAppointment");
                    }
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    render () {
        console.log(this.state.doctorDetails);
        let doctorDetails = null;
        if(this.state.doctorDetails)
        {
           doctorDetails = (
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
                                    <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                                    <ul className ="nav nav-tabs" id="myTab" role="tablist">
                                        <li className ="nav-item">
                                            <a className ="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                        </li>
                                        <li className ="nav-item">
                                            <a className ="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Chat With Me"/>
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
                                <div className ={["tab-content", classes.profile_tab].join(' ')}id="myTabContent">
                                    <div className ="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
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
                                        <p className="btn btn-primary" style = {{color: 'white', fontWeight: 'normal'}} onClick = {this.bookAppointmentHandler}>Book Appointment</p>
                                    </div>
                                    <div className ="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
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
                                                <label>Hourly Rate</label>
                                            </div>
                                            <div className ="col-md-6">
                                                <p>10$/hr</p>
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
                                        <div className ="row">
                                            <div className ="col-md-6">
                                                <label>Availability</label>
                                            </div>
                                            <div className ="col-md-6">
                                                <p>6 months</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>           
                </div>
               </div>
           );
        }
        return (
            <div>
              {doctorDetails}
            </div>
        );
    }
}

export default withRouter(DoctorProfile);