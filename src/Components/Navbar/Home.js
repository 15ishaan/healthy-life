import React, {Component} from 'react';
import axios from '../../Axios-url';
import HospitalCard from '../HospitalCard/HospitalCard'
import classes from '../HospitalCard/HospitalCard.module.css'


class Home extends Component {

    state = {}

    componentDidMount = () => {
        axios.get("/hospitals/")
            .then(response => {
                this.setHospitals(response.data);
                console.log(response);

            })
            .catch(error => {
                //console.log(error);
            })
    }

    setHospitals = (data) => {
        this.setState({
            hospitals: data
        })
    }

    render() {
        let hospitals = ( null
            // <div className = {classes.container}>
            //     <HospitalCard key = "1" hospitalData = {{hospital_name: "xyz", street_name: "xyz", id:  "1", username: "xyz", rating: "4"}} />
            // </div>
        );
        if(this.state.hospitals){
            hospitals = ( 
            <div className = {classes.container}>
                {this.state.hospitals.map((hospital) => (
                <HospitalCard key = {hospital.id} hospitalData = {hospital}/> ))};
            </div>
        )}
        return (
            <div>{hospitals}</div>
        );
    }
}

export default Home;