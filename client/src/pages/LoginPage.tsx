import { useState } from "react"
import React from 'react'
import httpsClient from "../httpsClient";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string> (" ");
  const [password, setPassword] = useState<string>("");
  const logInUser= async () => {
    console.log(email,password);
    //check if login credential is correct 
    if (!email || !password) {
        alert("Please enter both email and password");
        return;
    }
     try{
        const resp = await httpsClient.post("http://localhost:5000/login",{
            email,
            password,
        });
        console.log(resp.data);

        window.location.href= "/";
    }
    catch(error: any){
      if ( error.response.status === 401){
        alert("Invalid Credential");
      }
    }   
  };
    return (
    <div>
        <h1> Log Into Your Account</h1>
        <div>
        <form>
            <label>Email: </label>
            <input type = "text"
             value={email} 
             onChange={(e) => setEmail(e.target.value)}
             id = ""/>
        </form>
        </div>
        <div>
        <form>
           <label>Password: </label>
            <input type = "text"
             value={password} 
             onChange={(e) => setPassword(e.target.value)}
             id = ""/>
        </form>
        <button type="button" onClick={() => logInUser()}> Submit</button>
        </div>
       
    </div>
  )
}

export default LoginPage