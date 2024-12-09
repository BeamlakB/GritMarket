import React from 'react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <a href="/" className={styles.logo}>UMBC Market</a>
        <div className={styles.navLinks}>
          <a href="/add-post" className={styles.link}> create post</a>
          <a href="/profile" className={styles.link}>myacct</a> 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
