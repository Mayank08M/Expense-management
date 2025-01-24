import React from "react";
import logo from "../assets/logo.png";
import { MdOutlineDashboard } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import { MdOutlineLocalMall } from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import { TbFileSpreadsheet } from "react-icons/tb";
import { BsGraphUpArrow } from "react-icons/bs";
import styles from "../styles/sidebar.module.css";

const SideBar = () => {
  return (
    <>
      <div className={styles.maindiv}>
        <div>
          <img src={logo} height={80} width={80}></img>
        </div>
        <div className={styles.icondiv}>
          <MdOutlineDashboard className={styles.icon} />
          <span>Dashboard</span>
        </div>
        <div className={styles.icondiv}>
          <MdOutlineLocalMall className={styles.icon}/>
          <span>Manage Expense</span>
        </div>
        <div className={styles.icondiv}>
          <MdCurrencyRupee className={styles.icon}/>
          <span>Manage Income</span>
        </div>
        <div className={styles.icondiv}>
          <GoChecklist className={styles.icon}/>
          <span>Track Expenses</span>
        </div>
        <div className={styles.icondiv}>
          <TbFileSpreadsheet className={styles.icon}/>
          <span>New Sheet</span>
        </div>
        <div className={styles.icondiv}>
          <BsGraphUpArrow className={styles.icon}/>
          <span>Monthly Report</span>
        </div>
      </div>
    </>
  );
};

export default SideBar;
