import { useState } from "react"
import React from 'react'
import httpsClient from "../../httpsClient";
import styles from "./account.module.css"
import { alignPropType } from "react-bootstrap/esm/types";
export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string> (" ");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
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
      <div className={styles.pageContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}> Welcome Back </h2>
        <div>
        <form>
        <div className={styles.formGroup}>
            <label className={styles.label}>Email </label>
            <input className={styles.input} type = "text"
             value={email} 
             onChange={(e) => setEmail(e.target.value)}
             placeholder="UMBC email" 
             id = ""/>
        </div>
        </form>
        </div>
        <div>
        <form>
        <div className={styles.formGroup}>
           <label className={styles.label}>Password </label>
            <input   
            className={styles.input} 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            type={passwordVisible ? "text" : "password"}
            name="password"
            id="password"
             />
            <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.toggleButton}
            >
            {passwordVisible ? "Hide" : "Show"}
            </button>

          </div>
        </form>
        </div>
        
        <button className={styles.button} type="button" onClick={() => logInUser()} > Login</button>
        <a href="/Support"><p ><center>Forgot Passowrd</center></p></a>
        <h5><center>New to Grit Marketplace ??</center> </h5>
        <a href="/signup"><p><center> Join now</center></p></a>

        
       
    </div>
    </div>
  )
}

export default LoginPage