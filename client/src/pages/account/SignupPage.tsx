import React from 'react'
import { useState, useEffect } from "react";
import httpsClient from "../../httpsClient";
import styles from "./account.module.css"
const SignupPage = () => {
    const [email, setEmail] = useState<string> (" ");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [confirmPassword, setConfirmPassword]= useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
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

    const checkPs = () => {
      const passwordInput = document.getElementById('password') as HTMLInputElement | null;
      const confirmPasswordInput = document.getElementById('confirm_password') as HTMLInputElement | null;
      const message = document.getElementById('message') as HTMLElement | null;
    
      if (passwordInput && confirmPasswordInput && message) {
        if (passwordInput.value === confirmPasswordInput.value) {
          message.style.color = 'green';
          message.innerHTML = 'matching';
        } else {
          message.style.color = 'red';
          message.innerHTML = 'not matching';
        }
      }};
      return (
      <div className={styles.pageContainer}>
      <div className={styles.loginBox}>
          <h1 className={styles.title}> Create an account</h1>
          <div>
          <form className={styles.formGroup}>
              <label className={styles.label}>Email </label>
              <input type = "text"
              className={styles.input}
               value={email} 
               placeholder="Email"
               onChange={(e) => setEmail(e.target.value)}
               id = ""/>
               <label className={styles.label}>User Name </label>
              <input type = "text"
              className={styles.input}
               value={username} 
               placeholder="User name"
               onChange={(e) => setUsername(e.target.value)}
               id = ""/>
          </form>
          </div>
          <div>

      <form className={styles.formGroup}>
      <label className={styles.label}>Password</label>
      <div className={styles.passwordWrapper}>
        <input
          type={passwordVisible ? "text" : "password"}
          name="password"
          placeholder="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={checkPs}
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

      <label className={styles.label}>Confirm Password</label>
      <div className={styles.passwordWrapper}>
        <input
          type={passwordVisible ? "text" : "password"}
          name="confirm_password"
          placeholder="Confirm password"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyUp={checkPs}
          id="confirm_password"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={styles.toggleButton}
        >
          {passwordVisible ? "Hide" : "Show"}
        </button>
      </div>

      <span id="message"></span>
    </form>
          
          <button className={styles.button} type="button" onClick={() => signupUser()}> Submit</button>
          </div>
          
         
      </div>
      </div>
    )
 }
  
  
export default SignupPage