import React, {Component} from 'react';
// import Backdrop from '../../Assets/images/backdrop.jpg'
import classes from './HospitalDetails.module.css'
import HospitalDoctorsCard from './HospitalDoctorsCard';
import axios from '../../Axios-url'

class HospitalDetails extends Component{

    state = {};

    componentDidMount = () => {
        let curUrl = window.location.href;
        curUrl = curUrl.split("/").pop();
        const hospitalId = curUrl.split("/").pop();

        axios.get("/hospital_doctor/" + hospitalId + "/")
            .then(response => {
                console.log(response);
                if(response.status === 200) {
                    this.setHospitalDoctors(response.data);
                }
            })
            .catch(error => {
                console.log(error);
            })

        axios.get("/quickstart/hospital_name/" + hospitalId + "/")
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

    render () {
        let hospitalDetails = null;
        let hospitalDoctors = null;
        if(this.state.hospitalDetails) {
            hospitalDetails = (
                <div className = {classes.content}>
                <img className = {classes.image} src = {"http://c81f2005992f.ngrok.io" + this.state.hospitalDetails.image} alt = "xyz"></img>
                <br/><br/>
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
                        <HospitalDoctorsCard key = {doctor.id} doctorData = {doctor}/> ))};
                    </div>
                );
        }
        return (
            <div className = {classes.backdrop}>
                {hospitalDetails}
                <hr/>
                {hospitalDoctors}
            </div>
        );
    }
}

export default HospitalDetails;