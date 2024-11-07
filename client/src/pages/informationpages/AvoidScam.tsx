import React from 'react'
import styles from "./InfoPage.module.css"
const AvoidScam: React.FC = () => {
  return (
    <div className={styles.centeredBody}>
    <div className={styles.infopage}>
      
      <h2>Avoid Scams</h2>

    <p>To avoid scams, the Grit Marketplace team highly suggests that you meet with sellers in-person on public UMBC campus locations such as:</p>
    <ul>
      <li>The Commons building</li>
      <li>University Center</li>
      <li>Academic Building</li>
      <li>Library</li>
    </ul>
  
    <p>Meeting in-person allows you to verify that items are legitimate.</p>
  
    <p>Do not provide or accept payments before meeting in person.</p>
  
    <p>Report possible scams to the Grit Marketplace support center.</p>
  </div>
  </div>
  
  )
  
}

export default AvoidScam