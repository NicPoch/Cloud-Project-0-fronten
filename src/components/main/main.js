import React,{useState} from "react";
import Login from "./login";
import Registration from "./registration";

const Main =()=>{
    const [user,setUser]=useState();

    
    return((user)? null : <div><Login/><Registration/></div>);
}

export default Main;