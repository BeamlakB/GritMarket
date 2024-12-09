import React from 'react'
import { useState, useEffect } from "react";
import httpsClient from "../../httpsClient";
import styles from "./account.module.css"

const UserProfile = () =>{
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [posts, setPosts] = useState<any[]>([]);

    // Fetch the current user data from the backend
    const fetchUserData = async () => {
    try {
        console.log("Fetching user data from /@me")
        const response = await httpsClient.get("http://localhost:5000/@me", {withCredentials: true});
        console.log("User data fetched:", response.data);
        if(response.data.user && response.data.email){
            setUserName(response.data.user);
            setEmail(response.data.email);
        } else{
            console.error("Invalid User Data Received");
        }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
  
    const fetchPostsData = async () => {
        try{
            console.log("Fetching Posts");
            const response = await httpsClient.get("http://localhost:5000/profile", {withCredentials: true});
            console.log("Post data fetched", response.data);
            if(Array.isArray(response.data)){
                setPosts(response.data);
            } else {
                console.error("Invalid post data received");
            }
        } catch(error){
            console.error('Error fetching post data', error);
        }
    };

      useEffect(() => {
        fetchUserData();
        fetchPostsData();
    }, []);

    return (
        <div className={styles.alignContainer}>
            <div className={styles.profileWrapper}>
                <div className={styles.profileContainer}>
                    <img 
                        src="/imgs/book.jpg" 
                        alt="User Profile" 
                        className={styles.profileImage}
                    />
                </div>
                <div className={styles.username}>
                    <h4>Username: {userName}</h4>
                    <h4>Email: {email}</h4>                    
                </div>
            </div>
            <div className={styles.profileBox}>
                <h1>Posts</h1>
                {posts.length > 0 ?(
                    posts.map((post, index) => (
                        <div key={index} className={styles.post}>
                            <img src={post.imagePreview} alt={post.title} className={styles.postimage} />
                            <h3>{post.title}</h3>
                            <p>{post.descritpion}</p>
                            <p>{post.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>
            
        
    );


};

export default UserProfile