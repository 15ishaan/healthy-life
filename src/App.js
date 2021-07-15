import React, {Component} from "react";
import './App.css'
import { Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Navbar/Home";
import Contact from "./Components/Navbar/Contact";
import About from "./Components/Navbar/About";
import SignupUser from "./Components/Navbar/Signup/SignupUser";
import Login from "./Components/Navbar/Login";
import SignupHospital from "./Components/Navbar/Signup/SignupHospital";
import Otp from "./Components/Navbar/Signup/Otp/Otp";
import HospitalDetails from "./Components/HospitalDetails/HospitalDetails"
import DoctorProfile from "./Components/HospitalDetails/DoctorProfile";
import axios from "./Axios-url"

class App extends Component{

  state = {};

  componentDidMount = () => {
    const username = localStorage.getItem("username");
    axios.get('/quickstart/profile_user/' + username + '/')
        .then(response => {
            console.log(response);
            this.setUser(response.data);
        })
        .catch(error => {
            console.log(error);
        })
}

  setUser = (user) => {
    this.setState({
      user: user
    })
  }

  render () {

    return (
      <div>
        <Navbar user = {this.state.user} setUser = {this.setUser}/>
        <Route exact path = "/hospitals">
          <Home user = {this.state.user}/>
        </Route>
        <Route path = "/about">
          <About />
        </Route>
        <Route path = "/contact">
          <Contact />
        </Route>
        <Route path = "/login">
          <Login setUser = {this.setUser}/>
        </Route>
        <Route path = "/signupUser">
          <SignupUser />
        </Route>
        <Route path = "/signupHospital">
          <SignupHospital />
        </Route>
        <Route path = "/signup/otp">
          <Otp />
        </Route>
        <Route path = "/hospitals/hospitalDetails">
          <HospitalDetails />
        </Route>
        <Route path = "/hospitalDetails/doctor">
          <DoctorProfile />
        </Route>
      </div>
    );
  }
}

export default App;
