import React from 'react';
import styles from './Navbar.module.css';
import { User } from '../types';
import { useState, useEffect } from "react";
import httpsClient from "../httpsClient";

const Navbar: React.FC = () => {
  const [user, setUser]= useState<User | null>(null);
  useEffect (()=> {
    (async() => {
        try{
            const resp = await httpsClient.get("//localhost:5000/@me")
            setUser(resp.data); 
        }catch (error){
            console.log("Not authenticated")
        }
    })();
}, []);
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <a href="/" className={styles.logo}>UMBC Market</a>
        <div className={styles.navLinks}>
          

        {user ? (
              <>
          <a href="/add-post" className={styles.link}> create post</a>
              <a href="/profile" className={styles.link}>myacct</a>


              </>
            
            ) : (
              <>
                <a href="/login" className={styles.link}> login</a>
              <a href="/signup" className={styles.link}>signup</a>
              </>
            )
            }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
