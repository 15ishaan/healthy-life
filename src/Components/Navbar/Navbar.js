import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {


  handleLogout = () => {
    localStorage.clear();
    this.props.setUser(null);
  }

  render () {
      let buttons = null;
      if(this.props.user) {
        buttons = (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>   
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>  
            <li className="nav-item">
              <NavLink className="nav-link" to="/login" onClick = {this.handleLogout}>Logout</NavLink>
            </li> 
          </ul>
        );
      }
      else {
        buttons = (
        <ul className="navbar-nav ms-auto">  
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Signup
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/signupUser">As User</a>
              <a className="dropdown-item" href="/signupHospital">As Hospital</a>
            </div>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </li>
        </ul>
        );
      }
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="#">Navbar</NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {buttons}
          </div>
        </nav>
      );
    }
}

export default Navbar;