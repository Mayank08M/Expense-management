import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/horizontallogo.png";
import {
  MdOutlineDashboard,
  MdCurrencyRupee,
  MdOutlineLocalMall,
} from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import { GiMoneyStack } from "react-icons/gi";
import { TbFileSpreadsheet, TbShoppingCartCopy } from "react-icons/tb";
import { BsGraphUpArrow } from "react-icons/bs";
import styles from "../styles/sidebar.module.css";

const SideBar = () => {
  return (
    <div className={styles.maindiv}>
      <div>
        <NavLink to="/" className={styles.logo}>
          <img src={logo} height={110} width={120} alt="Logo" />
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
        to="/new-sheet"
        className={({ isActive }) =>
          `${styles.icondiv} ${isActive ? styles.active : ""}`
        }
      >
        <TbFileSpreadsheet className={styles.icon} />
        <span>Create Sheet</span>
      </NavLink>
      <NavLink
        to="/manage-expense"
        className={({ isActive }) =>
          `${styles.icondiv} ${isActive ? styles.active : ""}`
        }
      >
        <MdOutlineLocalMall className={styles.icon} />
        <span>Expense Sheets</span>
      </NavLink>
      <NavLink
        to="/manage-income"
        className={({ isActive }) =>
          `${styles.icondiv} ${isActive ? styles.active : ""}`
        }
      >
        <MdCurrencyRupee className={styles.icon} />
        <span>Income Sheets</span>
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
        to="/direct-expense"
        className={({ isActive }) =>
          `${styles.icondiv} ${isActive ? styles.active : ""}`
        }
      >
        <TbShoppingCartCopy className={styles.icon} />
        <span>Create Expense</span>
      </NavLink>
      <NavLink
        to="/direct-income"
        className={({ isActive }) =>
          `${styles.icondiv} ${isActive ? styles.active : ""}`
        }
      >
        <GiMoneyStack className={styles.icon} />
        <span>Create Income</span>
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
