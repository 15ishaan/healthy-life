import React, {useState} from 'react';
import classes from './Otp.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import axios from "../../../../Axios-url";

const Otp = () => {

    let location = useLocation();
    let curUrl = location.pathname;

    curUrl = curUrl.split("/").pop();
    const userId = curUrl.split("/").pop();

    const history = useHistory();

    const[otp, setOtp] = useState({
        otp:""
    });

    // let timeleft = 120;
    // let downloadTimer = setInterval(function() {
    //     timeleft--;
    //     document.getElementById("countdowntimer").textContent = timeleft;
    //     if(timeleft <= 0) {
    //         //setValidate({...validate, deactive: true});
    //         clearInterval(downloadTimer);
    //     }
    // },1000);

    const handleInputs = (event) => {
        setOtp({...otp, otp: event.target.value});
    }

    const submitOtp = () => {
        console.log(otp);
        if(otp.otp < 1000) window.alert("Enter 4 digit number");
        axios.post('/validateotp/' + userId + '/', otp)
             .then(response => {
                    console.log(response)
                    if(response.status === 200){
                        history.push("/login");
                    }
                })
             .catch(error => console.error());
    }

    return(
        <div className = {classes.otpBox}>
            <div className={classes.content}>
                <h4><strong>Enter the OTP sent to your email</strong></h4>
                <br/>
                <input type="text" placeholder="Enter 4-digit OTP" maxLength = "4" value = {otp.otp} onChange = {handleInputs}/>
                <input type="submit" name="otp_submit" value="Verify" onClick = {submitOtp}/>
                <br/><br/>
                {/* <p><small>Resend OTP in <span id="countdowntimer">120 </span> Seconds</small></p>  */}
                <p><strong>Didn't get the code? </strong><a href="/signup/otp">Resend</a> </p>
            </div>
        </div>
    );
}

export default Otp;