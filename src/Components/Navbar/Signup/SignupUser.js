import React, {Component, useState, useRef} from 'react';
// import SignupPic from '../../Assets/images/Signup-pic.png;
import {useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from '../../../Axios-url';

const SignupUser = () => {

    const{register, handleSubmit, formState:{errors}, reset, trigger, watch} = useForm();
    
    const password = useRef({});
    password.current = watch("password", "");
    const history = useHistory();

    const onSubmit = (data) => {
    axios.post('/quickstart/signup_as_user/', data)
            .then(response => {
                console.log(response)
                if(response.status === 200){
                    const userId = response.data.user_id;
                    history.push("/signup/otp/" + userId);
                }
            })
            .catch(error => console.error());
        reset();
    };

    return(
        <div className="container pt-5">
            <div className="row justify-content-sm-center pt-5">
                <div className="col-sm-6 shadow round pb-3" style = {{backgroundColor: "white"}}>
                <h1 className="text-center pt-3 text-secondary">Register!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                    <label className="col-form-label">First Name:</label>
                    <input type="text"
                        className={`form-control ${errors.name && "invalid"}`}
                        {...register("first_name", { required: "First name is Required" })}
                        onKeyUp={() => {
                        trigger("first_name");
                        }}
                        // name = "first_name"
                        // value = {user.first_name}
                        // onChange = {handleInputs}
                    />
                    {errors.first_name && (
                        <small className="text-danger">{errors.first_name.message}</small>
                    )}
                    </div>
                    <div className="form-group">
                    <label className="col-form-label">Last Name:</label>
                    <input type="text"
                        className={`form-control ${errors.name && "invalid"}`}
                        {...register("last_name", { required: "Last name is Required" })}
                        onKeyUp={() => {
                        trigger("last_name");
                        }}
                        // name = "last_name"
                        // value = {user.last_name}
                        // onChange = {handleInputs}
                    />
                    {errors.last_name && (
                        <small className="text-danger">{errors.last_name.message}</small>
                    )}
                    </div>
                    <div className="form-group">
                    <label className="col-form-label">Email:</label>
                    <input type="text"
                        className={`form-control ${errors.email && "invalid"}`}
                        {...register("email", { required: "Email is Required" ,
                        pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                        }})}
                        onKeyUp={() => {
                        trigger("email");
                        }}
                        // name = "username"
                        // value = {user.username}
                        // onChange = {handleInputs}
                    />
                    {errors.email && (
                        <small className="text-danger">{errors.email.message}</small>
                    )}
                    </div>
                    <div className="form-group">
                    <label className="col-form-label">Password:</label>
                    <input type="password"
                        autoComplete = "off"
                        className={`form-control ${errors.name && "invalid"}`}
                        {...register("password", { 
                            required: "Password is Required",
                            minLength: {
                                value: 6,
                                message: "Minimum Required length is 6",
                            },
                            maxLength: {
                                value: 10,
                                message: "Maximum allowed length is 10",
                            }
                        })}
                        onKeyUp={() => {
                        trigger("password");
                        }}
                        // name = "password"
                        // value = {user.password}
                        // onChange = {handleInputs}
                    />
                    {errors.password && (
                        <small className="text-danger">{errors.password.message}</small>
                    )}
                    </div>
                    <div className="form-group">
                    <label className="col-form-label">Confirm Password:</label>
                    <input type="password" 
                        className={`form-control ${errors.name && "invalid"}`}
                        {...register("confirm_password", { 
                            validate: value =>
                            value === password.current || "The passwords do not match"
                        })}
                        onKeyUp={() => {
                        trigger("confirm_password");
                        }}
                        // name = "confirm_password"
                        // value = {user.confirm_password}
                        // onChange = {handleInputs} 
                    />
                    {errors.confirm_password && (
                        <small className="text-danger">{errors.confirm_password.message}</small>
                    )}
                    </div>
                    <input type="submit" className="btn btn-primary my-3" value="Sign Up"/>
                </form>
                </div>
            </div>
        </div>
    );
}

export default SignupUser;