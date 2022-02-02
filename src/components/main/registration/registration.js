import React, { useState } from "react";
import { Form,Button } from "react-bootstrap";
import * as Joi from 'joi';

const Registration=(props)=>{
    const [mail,setMail]=useState("");
    const [password,setPassword]=useState("");

    const changeMail =async(e)=>{
        e.preventDefault();
        setMail(e.target.value);
    };
    const changePassword =async(e)=>{
        e.preventDefault();
        setPassword(e.target.value);
    };

    const submitForm=async(event)=>{
        event.preventDefault();
        let form={mail:mail,password:password}
        const {error}=schema.validate(form);
        if(!error){
            fetch("http://127.0.0.1:5000/users",{method:'POST',headers: {'Accept': 'application/json','Content-Type': 'application/json'},body:JSON.stringify(form)}).then(ans=>ans.json()).then(data=>{
                console.log(data);
                props.setUser(data);
                localStorage.setItem("user",data);
            });
        }
        else{
            alert(error);
        }
    };

    return(
        <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formRegisEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>changeMail(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRgisPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>changePassword(e)}/>
            </Form.Group>
            <Button variant="primary" type="submit" >
                Submit
            </Button>
        </Form>
    );
};

const schema=Joi.object({
    mail: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{1,30}$"))
});

export default Registration;
