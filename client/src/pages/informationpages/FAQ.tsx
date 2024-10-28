import React from 'react'

export const FAQ: React.FC = () => {
  return (
   <div>

        <h1>Frequently Asked Questions</h1>

        <h2>What is a typical transaction like?</h2>
        <ul>
        <li>Seller creates a post.</li>
        <li>Buyer browses the website.</li>
        <li>Buyer initiates communication with the seller.</li>
        <li>Buyer and Seller meet in-person on the UMBC campus.</li>
        <li>Buyer and Seller perform transaction using preferred method.</li>
        </ul>

        <h2>How to create a post</h2>
        <ul>
        <li>Click the “Create a Post” button on the left side of the screen.</li>
        <li>Fill in the textboxes to describe the item you would like to sell (Title, Description).</li>
        <li>You may upload photos of your items.</li>
        <li>Lastly, decide on a label for your post. This label determines where you post can be found.</li>
        </ul>

        <h2>How to modify a post</h2>
        <ul>
        <li>Click on “View Your Profile”.</li>
        <li>This will show you the posts you have created.</li>
        <li>You can click on any of its fields to edit them.</li>
        <li>Click “Post” to save your changes.</li>
        </ul>

        <h2>How to interact with a post</h2>
        <ul>
        <li>From the home page, you may click on one of the subcategories to browse through a filtered page of postings.</li>
        </ul>
   </div>
  )
}

export default FAQ
