import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as Joi from 'joi';
const UpdateUser=(props)=>{
    const [password, setPassword] = useState("");

    const changePassword =async(e)=>{
        e.preventDefault();
        setPassword(e.target.value);
    };
    const submitForm=async(event)=>{
        event.preventDefault();
        let form={password:password}
        const {error}=schema.validate(form);
        if(!error){
            fetch("http://127.0.0.1:5000/users/"+props.user.id,{method:'PUT',headers: {'Accept': 'application/json','Content-Type': 'application/json'},body:JSON.stringify(form)}).then(ans=>ans.json()).then(data=>{
                alert("Password updated");
                setPassword("");
            });
        }
        else{
            alert(error);
        }
    };
    return(
        <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formUpdatePassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>changePassword(e)}/>
            </Form.Group>
            <Button variant="primary" type="submit" >
                Update
            </Button>
        </Form>
    );
}
const schema=Joi.object({
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{1,30}$"))
});
export default UpdateUser;