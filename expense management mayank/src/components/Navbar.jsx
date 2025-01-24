import React from 'react'
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";
import styles from '../styles/navbar.module.css'

const Navbar = () => {
  return (
    <div>
    <nav className={styles.navbar}>
        <div style={{width: "20%"}}>
        <Link to="/"> 
            <img height={80} width={80} src={logo} alt="Logo" />
          </Link>
        </div>
        <div style={{width: "50%"}}>
            <ul className={styles.ul}>
                <li><Link style={{textDecoration: "none"}} to="/">Manage Expenses</Link></li>
                <li><Link style={{textDecoration: "none"}} to="/about">About Us</Link></li>
                <li><Link style={{textDecoration: "none"}} to="/contact">Contact Us</Link></li>
            </ul>
        </div>
        <div style={{width: "30%"}}>
        <Link to="/login">
            <button className={styles.loginbtn}>Login</button>
          </Link>
          <Link to="/signup">
            <button className={styles.signupbtn}>Sign Up</button>
          </Link>
        </div>
    </nav>
    </div>
  )
}

export default Navbar
