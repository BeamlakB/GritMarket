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
    <> <a href="/profile" ><button type="button">View Profile</button> </a>
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
              <tr><a href="/cat/Fashion%20%26%20Accessories/Pre-owned%20Clothing">Pre-owned Clothing</a></tr>
              <tr><a href="/cat/Fashion%20%26%20Accessories/Brand%20New%20Clothing">Brand New Clothing</a></tr>
              <tr><a href="/cat/Fashion%20%26%20Accessories/Shoes">Shoes</a></tr>
              <tr><a href="/cat/Fashion%20%26%20Accessories/Necklaces">Necklaces</a></tr>
              <tr><a href="/cat/Fashion%20%26%20Accessories/Bags">Bags</a></tr>
              <tr><a href="/cat/Fashion%20%26%20Accessories/Hats">Hats</a></tr>
              <tr><a href="/cat/Fashion%20%26%20Accessories/Vintage%20Clothing">Vintage Clothing</a></tr>
              <tr><a href="/cat/Fashion%20%26%20Accessories/Rings">Rings</a></tr>
              <tr><a href="/fashion">Other</a></tr>
              </tbody>
              <thead>
                <tr>
                  <th>Electronics & Accessories</th>
                </tr>
              </thead>
              <tbody>
              <tr><a href="/cat/Electronics%20%26%20Accessories/Computers">Computers</a></tr>
              <tr><a href="/cat/Electronics%20%26%20Accessories/Laptops">Laptops</a></tr>
              <tr><a href="/cat/Electronics%20%26%20Accessories/Smartphones">Smartphones</a></tr>
              <tr><a href="/cat/Electronics%20%26%20Accessories/TVs">TVs</a></tr>
              <tr><a href="/cat/Electronics%20%26%20Accessories/Gaming%20Consoles">Gaming Consoles</a></tr>
              <tr><a href="/cat/Electronics%20%26%20Accessories/Cables%20%26%20Cords">Cables & Cords</a></tr>
              <tr><a href="/cat/Electronics%20%26%20Accessories/Smart%20Watches">Smart Watches</a></tr>
              <tr><a href="/cat/Electronics%20%26%20Accessories/Calculators">Calculators</a></tr>
              <tr><a href="/cat/Electronics%20%26%20Accessories/USB%20Drives">USB Drives</a></tr>
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
              <tr><a href="/cat/Hobbies%20%26%20Games/Collectibles">Collectibles</a></tr>
              <tr><a href="/cat/Hobbies%20%26%20Games/Toys">Toys</a></tr>
              <tr><a href="/cat/Hobbies%20%26%20Games/Board%20Games">Board Games</a></tr>
              <tr><a href="/cat/Hobbies%20%26%20Games/Card%20Games">Card Games</a></tr>
              <tr><a href="/cat/Hobbies%20%26%20Games/Puzzles">Puzzles</a></tr>
              <tr><a href="/cat/Hobbies%20%26%20Games/Musical%20Instruments">Musical Instruments</a></tr>
              <tr><a href="/cat/Hobbies%20%26%20Games/Sports%20Equipment">Sports Equipment</a></tr>
              <tr><a href="/cat/Hobbies%20%26%20Games/Books">Books</a></tr>
              <tr><a href="/cat/Hobbies%20%26%20Games/CDs%20%26%20Vinyl%20Records">CDs & Vinyl Records</a></tr>
              <tr><a href="/cat/Hobbies%20%26%20Games/Art%20Supplies">Art Supplies</a></tr>
              <tr><a href="/cat/Hobbies%20%26%20Games/Handcrafted%20Items">Handcrafted Items</a></tr>
              <tr><a href="/cat/Hobbies%20%26%20Games/Camping%20Equipment">Camping Equipment</a></tr>
              <tr><a href="/cat/Hobbies%20%26%20Games/Gardening%20Supplies">Gardening Supplies</a></tr>
              <tr><a href="/cat/Hobbies%20%26%20Games/Trading%20Cards">Trading Cards</a></tr>
              <tr><a href="/toys">Other</a></tr>
              </tbody>
              <thead>
                <tr>
                  <th>Tickets & Events</th>
                </tr>
              </thead>
              <tbody>
              <tr><a href="/cat/Tickets%20%26%20Events/Concert%20Tickets">Concert Tickets</a></tr>
                <tr><a href="/cat/Tickets%20%26%20Events/UMBC%20Events">UMBC Events</a></tr>
                <tr><a href="/cat/Tickets%20%26%20Events/Sport%20Tickets">Sport Tickets</a></tr>
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