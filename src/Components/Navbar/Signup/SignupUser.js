import React, {Component} from 'react';
// import SignupPic from '../../Assets/images/Signup-pic.png'
import {withRouter} from 'react-router-dom';
import classes from './Signup.module.css'
import axios from '../../../Axios-url';

class SignupUser extends Component{

    state = {
        first_name:"", last_name:"", username:"", password:"", confirm_password:""
    }

    handleFirstName = (event) => {
        this.setState({first_name: event.target.value});
    }
    handleLastName = (event) => {
        this.setState({last_name: event.target.value});
    }
    handleUsername = (event) => {
        this.setState({username: event.target.value});
    }
    handlePassword = (event) => {
        this.setState({password: event.target.value});
    }
    handleConfirmPassword = (event) => {
        this.setState({confirm_password: event.target.value});
    }

    submitData = () => {
        if(this.state.first_name === "" || this.state.last_name === "" || 
          this.state.username === "" || this.state.password === "" || this.state.confirm_password === "") window.alert("Enter Your Credentials!");
        else if(this.state.password !== this.state.confirm_password) window.alert("Passwords must match");
        else{
            axios.post('/quickstart/signup_as_user/', this.state)
                .then(response => {
                    console.log(response)
                    if(response.status === 200){
                        const userId = response.data.user_id;
                        this.props.history.push("/signup/otp/" + userId);
                    }
                })
                .catch(error => console.error());
        }
    }

    render () {
        return(
            <div className = {classes.loginBox}>
                <div className={classes.left}>
                    <h1>Sign up</h1>
                    <br/><br/>
                    <input type="text" name="first_name" placeholder="Your First Name" value = {this.state.first_name} onChange = {this.handleFirstName}/>
                    <input type="text" name="last_name" placeholder="Your Last Name" value = {this.state.last_name} onChange = {this.handleLastName}/>
                    <input type="text" name="username" placeholder="Your E-mail" value = {this.state.username} onChange = {this.handleUsername}/>
                    <input type="password" name="password" placeholder="Your Password" value = {this.state.password} onChange = {this.handlePassword}/>
                    <input type="password" name="confirm_password" placeholder="Confirm Your Password" value = {this.state.confirm_password} onChange = {this.handleConfirmPassword}/>
                    <input type="submit" name="signup_submit" value="Sign me up" onClick = {this.submitData} />
                    <p>Already Registered? <a href = "/login">Sign-in</a></p>
                </div>
        
                <div className={classes.right}>
                    <span className={classes.loginwith}>Sign in with<br />social network</span>
                    <button className={[classes.socialSigninFacebook, classes.socialSignin].join(' ')}>Log in with facebook</button>
                    <button className={[classes.socialSigninTwitter, classes.socialSignin].join(' ')}>Log in with Twitter</button>
                    <button className={[classes.socialSigninGoogle, classes.socialSignin].join(' ')}>Log in with Google+</button>
                </div>
                <div className={classes.or}>OR</div>
                {/* <Route path = "/signup/otp/">
                    <Otp user_id = {this.state.user_id} />
                </Route> */}
            </div>
        );
    }
}

export default withRouter(SignupUser);