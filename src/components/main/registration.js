import React,{useState} from "react";
import axios from 'axios';
import { Button, Form, FormLabel } from "react-bootstrap";

const Registration=(props)=>{
    const [mail,setMail]=useState("");
    const [password,setPassword]=useState("");
    const [rpassword,setRPassword]=useState("");

    const regist = async()=>{};
    const checkPassword = async()=>{};
    const checkMail=async()=>{};

    return(
        <div>
            <h4>
                Registration
            </h4>
            <Form>
                <FormLabel>
                    Mail:
                </FormLabel>
                <input placeholder={mail}></input>
                <br/>
                <FormLabel>
                    Password:
                </FormLabel>
                <input placeholder={password}></input>
                <br/>
                <FormLabel>
                    Repeat password:
                </FormLabel>
                <input placeholder={rpassword}></input>
                <br/>
                <Button>
                    Login
                </Button>
            </Form>
        </div>
    );
}
export default Registration;