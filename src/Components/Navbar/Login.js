import React, {Component} from 'react';
import {withRouter } from 'react-router-dom';
import classes from './Signup/Signup.module.css';
import axios from '../../Axios-url';

class Login extends Component {

    state =  {
        user:{
            username: "",
            password: ""
        }
    }

    login = () => {
        console.log(this.state.user);
        axios.post('/login/', this.state.user)
                .then(response => {
                    if(response.status === 200){
                        //console.log(response);

                        //check if user is hospital
                        let token = response.data.token;
                        const identifier = token.substring(0, 4);
                        token = token.split("|").pop();

                        localStorage.setItem("token", token);
                        localStorage.setItem("username",this.state.user.username);

                        axios.get('/quickstart/profile_user/' + this.state.user.username + '/')
                            .then(res => {
                                console.log(res);
                                localStorage.setItem("id", res.data.id);
                                this.props.setUser(res.data);
                            })
                            .catch(error => {
                                console.log(error);
                            })
                        if(identifier === "None") {
                            localStorage.setItem("role", "user");
                            this.props.history.push("/hospitals");
                        }
                        else{
                            localStorage.setItem("role", "hospital");
                            this.props.history.push("/hospitalProfile");
                        } 
                    }
                })
                .catch(error => console.error());
    }

    handleUsername = (event) => {
        const updatedUser = {
            ...this.state.user,
        }
        updatedUser.username = event.target.value;
        this.setState({user: updatedUser});
    }

    handlePassword = (event) => {
        const updatedUser = {
            ...this.state.user,
        }
        updatedUser.password = event.target.value;
        this.setState({user: updatedUser});
    }

    render () {
        return (
        <div className = {classes.loginBox}>
            <div className={classes.left}>
                <h1>Login</h1>
                <br/><br/>
                <input type="text" onChange = {this.handleUsername} placeholder="Your E-mail" />
                <input type="password" onChange = {this.handlePassword} placeholder="Your Password" />
                <input type="submit" name="signin_submit" value="Login" onClick = {this.login}/><br/>
                <p>New here? <a href = "/SignupUser">Register</a></p>
            </div>
            
            <div className={classes.right}>
                <span className={classes.loginwith}>Sign in with<br />social network</span>
                <button className={[classes.socialSigninFacebook, classes.socialSignin].join(' ')}>Log in with facebook</button>
                <button className={[classes.socialSigninTwitter, classes.socialSignin].join(' ')}>Log in with Twitter</button>
                <button className={[classes.socialSigninGoogle, classes.socialSignin].join(' ')}>Log in with Google+</button>
            </div>
            <div className={classes.or}>OR</div>
        </div>
        );
    }
}

export default withRouter(Login);