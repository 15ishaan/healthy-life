import React, {useLayoutEffect} from 'react';
import { Component } from 'react';
import axios from '../../Axios-url'
import {withRouter} from 'react-router-dom';

class EditHospitalProfile extends Component{
    
    state = {};

    componentDidMount = () => {
        const username = localStorage.getItem("username");
        axios.get('/quickstart/profile_hospital/' + username + '/')
        .then(response => {
            console.log(response);
            this.setUser(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    setUser = (user) => {
        user.password = user.confirm_password;
        this.setState({
          user: user
        })
    }

    handleInputs = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        const user = this.state.user;
        user[name] = value;
        this.setState({user});
    }

    handleFileUpload = (event) => {
        const user = this.state.user;
        const file = event.target.files[0];
        user.image = file;
        const img = document.querySelector("img");
        const reader = new FileReader();
        reader.onload = function(){
            const result = reader.result;
            img.src = result;
        }
        reader.readAsDataURL(file);
        this.setState({user});
    }

    submitForm = () => {
        const formData = new FormData();
        formData.append('username', this.state.user.username);
        formData.append('hospital_name', this.state.user.hospital_name);
        formData.append('password', this.state.user.password);
        formData.append('confirm_password', this.state.user.confirm_password);
        formData.append('image', this.state.user.image);
        formData.append('street_name', this.state.user.street_name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        if(this.state.user.hospital_name === "" || this.state.user.street_name === "" || this.state.user.image === null || 
          this.state.user.username === "" || this.state.user.password === "" || this.state.user.confirm_password === "") window.alert("Enter Your Credentials!");
        else if(this.state.user.password !== this.state.user.confirm_password) window.alert("Passwords must match");
        else{
            axios.put('/quickstart/profile_hospital/' + this.state.user.username + '/', formData, config)
            .then(response =>{
               console.log(response)
               if(response.status === 200){
                   this.props.history.push("/hospitalProfile");
               }
           })
            .catch(error => console.error());
        }
    }

    cancelForm = () => {
        this.props.history.push("/hospitalProfile");
    }

    render() {
        if(!this.state.user) {
            return (<div></div>);
        }
        return (
            <div>
                <div className = "container">
                    <h1>Edit Profile</h1><hr/>
                    <div className = "row">
                    {/* <!-- left column --> */}
                        <div className = "col-md-3">
                            <div className = "text-center">
                                <img src={this.state.user.image} style={{width: "19rem", height: "20.8rem"}} className = "avatar img-circle" alt="hospital"/>
                                <h6>Upload a different photo...</h6>
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
                            <h3>Personal info</h3>
            
                            <form className = "form-horizontal" role="form">
                                <div className = "form-group">
                                    <label className = "col-lg-3 control-label">Hospital name:</label>
                                    <div className = "col-lg-8">
                                        <input className = "form-control" type="text" name = "hospital_name" placeholder = {this.state.user.hospital_name} value={this.state.user.hospital_name} onChange = {this.handleInputs}/>
                                    </div>
                                </div>
                                <div className = "form-group">
                                    <label className = "col-lg-3 control-label">Street name:</label>
                                    <div className = "col-lg-8">
                                        <input className = "form-control" type="text" name = "street_name" placeholder={this.state.user.street_name} value={this.state.user.street_name} onChange = {this.handleInputs}/>
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
                                    <label className = "col-md-3 control-label">Password:</label>
                                    <div className = "col-md-8">
                                        <input className = "form-control" type="password" name = "password" placeholder="Your Password" value={this.state.user.password} onChange = {this.handleInputs}/>
                                    </div>
                                </div>
                                <div className = "form-group">
                                    <label className = "col-md-3 control-label">Confirm password:</label>
                                    <div className = "col-md-8">
                                        <input className = "form-control" type="password" name = "confirm_password" placeholder="Your Confirm Password" value={this.state.user.confirm_password} onChange = {this.handleInputs}/>
                                    </div>
                                </div>
                                <div className = "form-group">
                                    <label className = "col-md-3 control-label"></label>
                                    <div className = "col-md-8">
                                        <input type="button" className = "btn btn-primary" value="Save Changes" onClick = {this.submitForm}/>
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

export default withRouter(EditHospitalProfile);