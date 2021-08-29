import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import classes from './Signup.module.css';
import axios from '../../../Axios-url';

const SignupHospital = () => {
    
    const history = useHistory();

    const[user, setUser] = useState({
        username:"", hospital_name:"", password:"", confirm_password:"", image: null, street_name:""
    });
    
    let name, value;
    const handleInputs = (event) => {
        name = event.target.name;
        value =  event.target.value;
        setUser({...user, [name]: value});
    }

    const handleFileUpload = (event) => {
       setUser({...user, image: event.target.files[0]});
       console.log(user.image);
    }

    const submitData = () => {
        const formData = new FormData();
        formData.append('username', user.username);
        formData.append('hospital_name', user.hospital_name);
        formData.append('password', user.password);
        formData.append('confirm_password', user.confirm_password);
        formData.append('image', user.image);
        formData.append('street_name', user.street_name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        if(user.hospital_name === "" || user.street_name === "" || user.image === null || 
          user.username === "" || user.password === "" || user.confirm_password === "") window.alert("Enter Your Credentials!");
        else if(user.password !== user.confirm_password) window.alert("Passwords must match");
        else{
            axios.post('/quickstart/signup_as_hospital/', formData, config)
            .then(response =>{
               console.log(response)
               if(response.status === 200){
                   const userId = response.data.user_id;
                   history.push("/signup/otp" + userId);
               }
           })
            .catch(error => console.error());
        }
    }
       

    return(
        <div className = {classes.loginBox}>
            <div className={classes.left}>
                <h1>Sign up</h1>
                <br/><br/>
                <input type="text" name="hospital_name" placeholder="Your Hospital Name" value = {user.hospital_name} onChange = {handleInputs}/>
                <input type="text" name="username" placeholder="Your E-mail" value = {user.username} onChange = {handleInputs}/>
                <input type="password" name="password" placeholder="Your Password" value = {user.password} onChange = {handleInputs}/>
                <input type="password" name="confirm_password" placeholder="Confirm Your Password" value = {user.confirm_password} onChange = {handleInputs}/>
                <input type="submit" name="signup_submit" value="Sign me up" onClick = {submitData}/>
                {/* <div className={classes.select_arrow}></div> */}
                <p>Already Registered? <a href = "/login">Sign-in</a></p>
            </div>
    
            <div className={classes.right}>
            <input className={classes.street_name} type="text" name="street_name" placeholder="Your Street Name" value = {user.street_name} onChange = {handleInputs}/>
            {/* <select className={classes.input_field} name = {user.}>
                <option>Select Your State</option>
                <option>Uttar pradesh</option>
                <option>West Bengal</option>
            </select> */}
            <form className = {classes.upload_image}>
            <div className="form-group">
                <label for="exampleFormControlFile1"><strong>Hospital's Image</strong></label>
                <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange = {handleFileUpload}/>
            </div>
            </form>
            </div>
        </div>
    );
}

export default SignupHospital;