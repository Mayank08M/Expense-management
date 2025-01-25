import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { MdOutlineDashboard, MdCurrencyRupee, MdOutlineLocalMall } from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import { TbFileSpreadsheet } from "react-icons/tb";
import { BsGraphUpArrow } from "react-icons/bs";
import styles from "../styles/sidebar.module.css";

const SideBar = () => {
  return (
    <div className={styles.maindiv}>
      <div>
        <NavLink to="/" className={styles.logo}>
          <img src={logo} height={80} width={80} alt="Logo" />
        </NavLink>
      </div>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `${styles.icondiv} ${isActive ? styles.active : ""}`
        }
      >
        <MdOutlineDashboard className={styles.icon} />
        <span>Dashboard</span>
      </NavLink>
      <NavLink
        to="/manage-expense"
        className={({ isActive }) =>
          `${styles.icondiv} ${isActive ? styles.active : ""}`
        }
      >
        <MdOutlineLocalMall className={styles.icon} />
        <span>Manage Expense</span>
      </NavLink>
      <NavLink
        to="/manage-income"
        className={({ isActive }) =>
          `${styles.icondiv} ${isActive ? styles.active : ""}`
        }
      >
        <MdCurrencyRupee className={styles.icon} />
        <span>Manage Income</span>
      </NavLink>
      <NavLink
        to="/track-expenses"
        className={({ isActive }) =>
          `${styles.icondiv} ${isActive ? styles.active : ""}`
        }
      >
        <GoChecklist className={styles.icon} />
        <span>Track Expenses</span>
      </NavLink>
      <NavLink
        to="/new-sheet"
        className={({ isActive }) =>
          `${styles.icondiv} ${isActive ? styles.active : ""}`
        }
      >
        <TbFileSpreadsheet className={styles.icon} />
        <span>New Sheet</span>
      </NavLink>
      <NavLink
        to="/monthly-report"
        className={({ isActive }) =>
          `${styles.icondiv} ${isActive ? styles.active : ""}`
        }
      >
        <BsGraphUpArrow className={styles.icon} />
        <span>Monthly Report</span>
      </NavLink>
    </div>
  );
};

export default SideBar;
