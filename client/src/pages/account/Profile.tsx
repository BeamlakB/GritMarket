import React from 'react'
import { useState, useEffect } from "react";
import httpsClient from "../../httpsClient";
import styles from "./account.module.css"
import { Container, Row, Col, Card} from "react-bootstrap"; // Import Bootstrap components

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

            <div className={styles.postBox}>
                <h1>Posts</h1>
                {posts.length > 0 ?(
                   
                   <Container fluid>
                   <Row md={2} xs={1} lg={4} className="g-4"> {/* Grid layout */}
                     {posts.map((post, index) => (
                       <Col key={index}>
                         <Card className="h-100">
                           <Card.Img
                             variant="top"
                             src={post.imagePreview}
                             alt={post.title}
                             style={{ height: "100px", width:"100px", objectFit: "scale-down" }}
                           />
                           <Card.Body>
                             <Card.Title>{post.title}</Card.Title>
                             <Card.Text>
                               {post.description}
                             </Card.Text>
                             <Card.Text className="fw-bold">
                               ${post.price}
                             </Card.Text>
                           </Card.Body>
                         </Card>
                       </Col>
                     ))}
                   </Row>
                 </Container>
                   
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>
            
        
    );


};

export default UserProfile