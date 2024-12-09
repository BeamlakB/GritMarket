import React from "react";
import { useState, useEffect } from "react";
import { User } from '../types';
import httpsClient from "../httpsClient";
import "../index.css"
import FAQ from "./informationpages/FAQ"
const LandingPage: React.FC = () => {
    //data is located in types
    const [user, setUser]= useState<User | null>(null);
    //logging out funciton 
    const logoutUser = async() =>{
        const resp = await httpsClient.post("//localhost:5000/logout")
        window.location.href= "/"
    }
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


    return <div>
        
        <div className="container">
        <div className="left-section">
        <h1 style={{ margin: '10px', fontSize: '30px' }}>Grit Marketplace</h1>    
        <br />
        {user ? (
    <><button type="button">View Profile</button>
     <button type="button" onClick={logoutUser}>Logout</button>

    </>
    
  ) : (
    <>
      <a href="/login">
        <button type="button">Login</button>
      </a>
      <a href="/signup">
        <button type="button">Create Account</button>
      </a>
    </>
  )
  }
        
        <br />

        <nav>
          <ul style={{ listStyleType: 'none' }}>
            <li>
              <a href="/FAQ">Frequently Asked Question</a>
            </li>
            <li>
              <a href="/">Payment Suggestion</a>
            </li>
            <li>
              <a href="/AvoidScam">Avoid Scams</a>
            </li>
            <li>
              <a href="/SafteyTips">Personal Safety Tips</a>
            </li>
            <li>
              <a href="/Support">Contact Grit Marketplace Support</a>
            </li>
          </ul>
        </nav>

        <img src="../../public/imgs/Home-dog.png" alt="" style={{ width: 'auto', height: 'auto' }} />
      </div>
        
      <div className="right-section">
        <div className="row">
          <div className="column">
            <table>
              <thead>
                <tr>
                  <th>Fashion & Accessories</th>
                </tr>
              </thead>
              <tbody>
                <tr><a href="/">Pre-owned Clothing</a></tr>
                <tr><a href="/">Brand New Clothing</a></tr>
                <tr><a href="/">Shoes</a></tr>
                <tr><a href="/">Necklaces</a></tr>
                <tr><a href="/">Bags</a></tr>
                <tr><a href="/">Hats</a></tr>
                <tr><a href="/">Vintage Clothing</a></tr>
                <tr><a href="/">Rings</a></tr>
                <tr><a href="/fashion">Other</a></tr>
              </tbody>
              <thead>
                <tr>
                  <th>Electronics & Accessories</th>
                </tr>
              </thead>
              <tbody>
                <tr><a href="/">Computers</a></tr>
                <tr><a href="/">Laptops</a></tr>
                <tr><a href="/">Smartphones</a></tr>
                <tr><a href="/">TVs</a></tr>
                <tr><a href="/">Gaming Consoles</a></tr>
                <tr><a href="/">Cables & Cords</a></tr>
                <tr><a href="/">Smart Watches</a></tr>
                <tr><a href="/">Calculators</a></tr>
                <tr><a href="/">USB Drives</a></tr>
                <tr><a href="/electronics">Other</a></tr>
              </tbody>
            </table>
          </div>

          <div className="coulum">
            <table>
              <thead>
                <tr>
                  <th>Hobbies & Games</th>
                </tr>
              </thead>
              <tbody>
                <tr><a href="/">Collectibles</a></tr>
                <tr><a href="/">Toys</a></tr>
                <tr><a href="/">Board Games</a></tr>
                <tr><a href="/">Card Games</a></tr>
                <tr><a href="/">Puzzles</a></tr>
                <tr><a href="/">Musical Instruments</a></tr>
                <tr><a href="/">Sports Equipment</a></tr>
                <tr><a href="/">Books</a></tr>
                <tr><a href="/">CDs & Vinyl Records</a></tr>
                <tr><a href="/">Art Supplies</a></tr>
                <tr><a href="/">Handcrafted Items</a></tr>
                <tr><a href="/">Camping Equipment</a></tr>
                <tr><a href="/">Gardening Supplies</a></tr>
                <tr><a href="/">Trading Cards</a></tr>
                <tr><a href="/toys">Other</a></tr>
              </tbody>
              <thead>
                <tr>
                  <th>Tickets & Events</th>
                </tr>
              </thead>
              <tbody>
                <tr><a href="/">Concert Tickets</a></tr>
                <tr><a href="/">UMBC Events</a></tr>
                <tr><a href="/">Sport Tickets</a></tr>
                <tr><a href="/tickets">other</a></tr>

              </tbody>
            </table>
          </div>   
    </div>
    </div>      
    </div>     
        
         
    </div>
    
}

export default LandingPage