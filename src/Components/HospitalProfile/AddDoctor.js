import React from 'react'
import { Component } from 'react';
import blankProfilePicture from "../../Assets/images/blankProfilePicture.png"
import axios from '../../Axios-url'
import {withRouter} from 'react-router-dom';


class AddDoctor extends Component{

    state = {

        doctor:{
            first_name:"", 
            last_name:"", 
            Qualification:"",
            Specialization:"", 
            Contact:"", 
            image: null, 
            Years_of_Experience: "",
            hospital: localStorage.getItem("id")
        }
    }

    handleInputs = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        const doctor = this.state.doctor;
        doctor[name] = value;
        this.setState({doctor});
    }

    handleFileUpload = (event) => {
        const doctor = this.state.doctor;
        const file = event.target.files[0];
        doctor.image = file;
        const img = document.querySelector("img");
        const reader = new FileReader();
        reader.onload = function(){
            const result = reader.result;
            img.src = result;
        }
        reader.readAsDataURL(file);
        this.setState({doctor});
    }

    addDoctor = () => {
        const formData = new FormData();
        formData.append('hospital', this.state.doctor.hospital);
        formData.append('first_name', this.state.doctor.first_name);
        formData.append('last_name', this.state.doctor.last_name);
        formData.append('Qualification', this.state.doctor.Qualification);
        formData.append('Specialization', this.state.doctor.Specialization);
        formData.append('image', this.state.doctor.image);
        formData.append('Contact', this.state.doctor.Contact);
        formData.append('Years_of_Experience', this.state.doctor.Years_of_Experience);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        console.log(this.state.doctor);
        if(this.state.doctor.hospital === "" || this.state.doctor.first_name === "" || this.state.doctor.image === null || 
          this.state.doctor.last_name === "" || this.state.doctor.Qualification === "" || this.state.doctor.Years_of_Experience === ""
          || this.state.doctor.Specialization === "" || this.state.doctor.Contact === "") window.alert("Enter Your Credentials!");
        else{
            axios.post('/quickstart/hospital/', formData, config)
            .then(response =>{
               console.log(response)
               if(response.status === 201){
                   this.props.history.push("/hospitalProfile");
               }
           })
            .catch(error => console.error());
        }
    }

    cancelForm = () => {
        this.props.history.push("/hospitalProfile");
    }


    render(){
        return (
            <div>
                <div className = "container">
                    <h1>Add Doctor Details</h1><hr/>
                    <div className = "row">
                    {/* <!-- left column --> */}
                        <div className = "col-md-3">
                            <div className = "text-center">
                                <img src={blankProfilePicture} style={{width: "19rem", height: "20.8rem"}} className = "avatar img-circle" alt=""/>
                                <h6>Upload a profile photo...</h6>
                                <input type="file" className = "form-control" onChange = {this.handleFileUpload}/>
                            </div>
                        </div>
                        {/* <!-- edit form column --> */}
                        <div className = "col-md-9 personal-info">
                            <div className = "alert alert-info alert-dismissable">
                                <a className = "panel-close close" data-dismiss="alert">×</a> 
                                <i className = "fa fa-coffee"></i>
                                This is an <strong>.alert</strong>. Use this to show important messages to the user.
                            </div>
                            <h3>Doctor's Info</h3>
            
                            <form className = "form-horizontal" role="form">
                                <div className = "form-group">
                                    <label className = "col-lg-3 control-label">First name:</label>
                                    <div className = "col-lg-8">
                                        <input className = "form-control" type="text" name = "first_name" placeholder = "Your First Name" value = {this.state.doctor.first_name} onChange = {this.handleInputs}/>
                                    </div>
                                </div>
                                <div className = "form-group">
                                    <label className = "col-lg-3 control-label">Last name:</label>
                                    <div className = "col-lg-8">
                                        <input className = "form-control" type="text" name = "last_name" placeholder= "Your Last Name" value = {this.state.doctor.last_name} onChange = {this.handleInputs}/>
                                    </div>
                                </div>
                                {/* <div className = "form-group">
                                    <label className = "col-lg-3 control-label">Company:</label>
                                    <div className = "col-lg-8">
                                        <input className = "form-control" type="text" value=""/>
                                    </div>
                                </div>
                                <div className = "form-group">
                                    <label className = "col-lg-3 control-label">Email:</label>
                                    <div className = "col-lg-8">
                                        <input className = "form-control" type="text" value="janesemail@gmail.com"/>
                                    </div>
                                </div>
                                <div className = "form-group">
                                    <label className = "col-lg-3 control-label">Time Zone:</label>
                                    <div className = "col-lg-8">
                                        <div className = "ui-select">
                                            <select id="user_time_zone" className = "form-control">
                                                <option value="Hawaii">(GMT-10:00) Hawaii</option>
                                                <option value="Alaska">(GMT-09:00) Alaska</option>
                                                <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                                                <option value="Arizona">(GMT-07:00) Arizona</option>
                                                <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                                                <option value="Central Time (US &amp; Canada)" selected="selected">(GMT-06:00) Central Time (US &amp; Canada)</option>
                                                <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                                                <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className = "form-group">
                                    <label className = "col-md-3 control-label">Username:</label>
                                    <div className = "col-md-8">
                                        <input className = "form-control" type="text" defaultValue={this.state.user.username}/>
                                    </div>
                                </div> */}
                                <div className = "form-group">
                                    <label className = "col-md-3 control-label">Qualification:</label>
                                    <div className = "col-md-8">
                                        <input className = "form-control" type="text" name = "Qualification" placeholder="Qualification" value = {this.state.doctor.Qualification} onChange = {this.handleInputs}/>
                                    </div>
                                </div>
                                <div className = "form-group">
                                    <label className = "col-md-3 control-label">Specialization:</label>
                                    <div className = "col-md-8">
                                        <input className = "form-control" type="text" name = "Specialization" placeholder="Specialization" value = {this.state.doctor.Specialization} onChange = {this.handleInputs}/>
                                    </div>
                                </div>
                                <div className = "form-group">
                                    <label className = "col-md-3 control-label">Years of Experience:</label>
                                    <div className = "col-md-8">
                                        <input className = "form-control" style = {{width: "225px"}} type="number" name = "Years_of_Experience" placeholder="Years" value= {this.state.doctor.Years_of_Experience} onChange = {this.handleInputs}/>
                                    </div>
                                </div>
                                <div className = "form-group">
                                    <label className = "col-md-3 control-label">Contact:</label>
                                    <div className = "col-md-8">
                                        <input className = "form-control" style = {{width: "225px"}} placeholder="888 888 8888" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" type="tel" name = "Contact" value = {this.state.doctor.Contact} maxLength="10" onChange = {this.handleInputs}/>
                                    </div>
                                </div>
                                <div className = "form-group">
                                    <label className = "col-md-3 control-label"></label>
                                    <div className = "col-md-8">
                                        <input type="button" className = "btn btn-primary" value="Add Doctor" onClick = {this.addDoctor}/>
                                        <span></span>
                                        <input type="reset" className = "btn btn-default" value="Cancel" onClick = {this.cancelForm}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <hr></hr>
            </div>
        );
    }
}

export default withRouter(AddDoctor);