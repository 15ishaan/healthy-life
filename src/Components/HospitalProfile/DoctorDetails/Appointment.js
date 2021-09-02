import React from "react";
import { Component } from "react";
import axios from '../../../Axios-url'

class Appointment extends Component {
    

    acceptReq = (data) => {

        const form = {username: data.username, doctor: data.doctor, status: "accept"};
        axios.post("/quickstart/appointment_reply/accept/" + data.id + "/", form)
            .then(response => {
                console.log(response);
                if(response.status === 200) window.location.reload();
            })
            .catch(error => {
                console.log(error);
            })
    }

    declineReq = (data) => {

        const form = {username: data.username, doctor: data.doctor, status: "decline"};
        axios.post("/quickstart/appointment_reply/decline/" + data.id + "/", form)
            .then(response => {
                console.log(response);
                if(response.status === 200) window.location.reload();
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        let button = null;
        if(this.props.data.status === "accept") {
            button = (<button type="button" className="btn btn-success">Accepted</button>)
        }
        else if(this.props.data.status === "decline") {
            button = (<button type="button" className="btn btn-danger">Declined</button>)
        }
        else {
            button = (<div>
                <button type="button" className="btn btn-success" onClick = {() => this.acceptReq(this.props.data)}>Accept</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" className="btn btn-danger" onClick = {() => this.declineReq(this.props.data)}>Decline</button>
            </div>)
        } 
        return(
            <div className ="row">
                <div className ="col-md-6">
                    <label>{this.props.data.username}</label>
                </div>
                <div className ="col-md-6">
                    {button}
                </div>
                <br/>
                <br/>
            </div>
        );
    }
}

export default Appointment;