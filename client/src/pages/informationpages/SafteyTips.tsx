import React from 'react'
import styles from './InfoPage.module.css'
const SafteyTips: React.FC = () => {
  return (
    <div className={styles.centeredBody}>
    <div className={styles.infopage}>

    <h2>Personal Safety Tips</h2>

    <p>Even though our app is only for the UMBC community, it is important to take safety precautions.</p>

    <p>It is vital to:</p>
    <ul>
    <li>Meet in a public place. The UMBC campus will likely be the most ideal location, but other options include other public locations like a bank or police department.</li>
    <li>Do not invite strangers into your home or dorm.</li>
    <li>Bring a friend or group of friends with you! This is especially important when dealing with high value items.</li>
    <li>Tell someone where you are going.</li>
    </ul>
    </div>
    </div>
  )
}

export default SafteyTips