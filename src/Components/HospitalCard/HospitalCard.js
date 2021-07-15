import React, {Component} from 'react';
import classes from './HospitalCard.module.css';
import ratedStar from '../../Assets/images/ratedStar.png';
import halfRatedStar from '../../Assets/images/halfRatedStar.png';
import unratedStar from '../../Assets/images/unratedStar.png';
import {withRouter} from 'react-router-dom';

class HospitalCard extends Component {

    getStar(value) {
        switch (value) {
            case 0:
                return unratedStar;
            case 50:
                return halfRatedStar;
            case 100:
                return ratedStar;
            default:
                return ratedStar;
        }
    }
    getStars(value) {
        switch(parseFloat(value)) {
            case 0.0:
                return [0, 0, 0, 0, 0];
            case 0.5:
                return [50, 0, 0, 0, 0];
            case 1.0:
                return [100, 0, 0, 0, 0];
            case 1.5:
                return [100, 50, 0, 0, 0];
            case 2.0:
                return [100, 100, 0, 0, 0];
            case 2.5:
                return [100, 100, 50, 0, 0];
            case 3.0:
                return [100, 100, 100, 0, 0];
            case 3.5:
                return [100, 100, 100, 50, 0];
            case 4.0:
                return [100, 100, 100, 100, 0];
            case 4.5:
                return [100, 100, 100, 100, 50];
            case 5.0:
                return [100, 100, 100, 100, 100];
            default:
                return [100, 100, 100, 100, 100];
                        
        }
    }

    hospitalDetailsHandler = (id) => {
        this.props.history.push("/hospitals/hospitalDetails/" + id);
    }

    render () {
        return (
            <div className={classes.card} style={{width: "20rem"}} onClick = {() => this.hospitalDetailsHandler(this.props.hospitalData.id)}>
                <img src={this.props.hospitalData.image} style={{width: "19.8rem", height: "19rem"}} className="card-img-top" alt="Hospital-Image"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.hospitalData.hospital_name}</h5>
                    <h6 className="card-text">Address: {this.props.hospitalData.street_name}</h6>
                    <h6 className="card-text">For more information,<br/> Contact: {this.props.hospitalData.username}</h6>
                    {(this.getStars(this.props.hospitalData.rating)).map((value, idx) => (
                        <img key = {idx} src = {this.getStar(value)} style={{width: "2rem", height: "2rem"}} alt = "star"></img>
                    ))}
                </div>
            </div>
        );
    }
}

export default withRouter(HospitalCard);