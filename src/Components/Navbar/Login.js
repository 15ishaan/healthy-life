import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Signup/Signup.module.css';

const Login = () => (
    <div className = {classes.loginBox}>
        <div className={classes.left}>
            <h1>Login</h1>
            <br/><br/>
            <input type="text" name="email" placeholder="Your E-mail" />
            <input type="password" name="password" placeholder="Your Password" />
            <input type="submit" name="signup_submit" value="Login" />
            <p>New here? <NavLink to = "/SignupUser">Register</NavLink></p>
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

export default Login;