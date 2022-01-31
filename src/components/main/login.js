import React,{useState} from "react";
import axios from 'axios';
import { Button, Form, FormLabel } from "react-bootstrap";

const Login=(props)=>{
    const [mail,setMail]=useState("");
    const [password,setPassword]=useState("");

    return(
        <div>
            <h4>
                Login
            </h4>
            <Form>
                <FormLabel>
                    Mail:
                </FormLabel>
                <input></input>
                <br/>
                <FormLabel>
                    Password:
                </FormLabel>
                <input></input>
                <br/>
                <Button>
                    Login
                </Button>
            </Form>
        </div>
    );
}
export default Login;