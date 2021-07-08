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

class App extends Component{

  render () {

    return (
      <div>
        <Navbar />
        <Route exact path = "/">
          <Home />
        </Route>
        <Route path = "/about">
          <About />
        </Route>
        <Route path = "/contact">
          <Contact />
        </Route>
        <Route path = "/login">
          <Login />
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
      </div>
    );

  }
}

export default App;
