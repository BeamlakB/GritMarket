import React from 'react'
import { useState, useEffect } from "react";
import httpsClient from "../httpsClient";

const SignupPage = () => {
    const [email, setEmail] = useState<string> (" ");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const signupUser= async () => {
      console.log(email,password);
      //check if login credential is correct 
      if (!email || !password) {
          alert("Please enter both email and password");
          return;
      }
       try{
          const resp = await httpsClient.post("http://localhost:5000/signup",{
              email,
              password,
              username
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
          <h1> Create an account</h1>
          <div>
          <form>
              <label>User Name: </label>
              <input type = "text"
               value={username} 
               onChange={(e) => setUsername(e.target.value)}
               id = ""/>
          </form>
          </div>
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
          <button type="button" onClick={() => signupUser()}> Submit</button>
          </div>
         
      </div>
    )
 }
  
  
export default SignupPage