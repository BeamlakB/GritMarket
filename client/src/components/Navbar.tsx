import React from 'react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <a href="/" className={styles.logo}>UMBC Market</a>
        <div className={styles.navLinks}>
          <a href="/for-sale" className={styles.link}>post</a>
          <a href="/jobs" className={styles.link}>myacct</a> 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
