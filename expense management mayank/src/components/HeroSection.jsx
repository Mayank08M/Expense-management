import React from "react";
import styles from "../styles/herosection.module.css";
import heroImg from "../assets/images/heroImage.png";
import magnetMoney from "../assets/images/magnetMoney.png";

const HeroSection = () => {
  return (
    <>
      <div className={styles.maindiv}>
        <div className={styles.leftdiv}>
          <h1>
            Take Control of Your{" "}
            <span className={styles.highlight}>EXPENSES</span> Today!
          </h1>
          <p>
            Say goodbye to financial stress! Our platform empowers you to track,
            manage, and optimize your money like never before. Turn every rupee
            into a smart investment. Welcome to India's next-gen Khatabook!
          </p>
          <button className={styles.getstarted}>Get Started Now</button>
        </div>

        <div>
          <img src={heroImg} height={500} width={550}></img>
        </div>
      </div>
      <div>
        <h2>What is Expenses Management?</h2>
        <div style={{display: "flex", alignItems: "center"}}>
          <div>
            <img src={magnetMoney} height={500} width={600}></img>
          </div>
          <div className={styles.sec2}>
            <p>
              Managing expenses effectively is the cornerstone of financial
              stability and success. Expense management is not just about
              keeping track of where your money goes—it's a comprehensive
              process that involves organizing, analyzing, and optimizing your
              personal or business finances. By understanding your spending
              habits, you can identify areas where you can save, set achievable
              financial goals, and ultimately make smarter financial decisions.
              Whether it’s for personal budgeting, tracking business expenses,
              or planning for future investments, having a robust system in
              place is essential for improving your overall financial health.
              <br />
              <br />
              That's where <span className={styles.highlight}>
                BudgetBuddy
              </span>{" "}
              comes in—a platform designed to revolutionize the way you manage
              your money. With BudgetBuddy, you gain access to powerful tools
              and resources that simplify expense management. From tracking
              daily expenses and categorizing transactions to setting custom
              budgets and generating detailed reports, BudgetBuddy offers a
              seamless, user-friendly experience tailored to your needs.
              <br />
              <br />
              Take the stress out of managing your money and embrace a smarter,
              simpler way to handle your expenses with BudgetBuddy. Let’s make
              your financial dreams a reality—one smart decision at a time!
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2>Why Choose BudgetBuddy?</h2>
        <div className={styles.faq}>
          <div className={styles.faqItem}>
            <h3>1. How can BudgetBuddy help me save money?</h3>
            <p>
              BudgetBuddy provides insights into your spending habits, helping
              you identify unnecessary expenses and allocate your funds more
              efficiently. By setting goals and tracking your progress, you can
              optimize your spending and increase your savings.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3>2. Is BudgetBuddy suitable for businesses?</h3>
            <p>
              Yes! BudgetBuddy is designed to handle both personal and business
              expenses. You can track business-related costs, categorize them,
              and generate reports to keep your finances in check.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3>3. Is my data safe with BudgetBuddy?</h3>
            <p>
              Absolutely! We prioritize your privacy and use advanced security
              measures to ensure your financial data is safe and encrypted.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3>4. Can I use BudgetBuddy on my mobile device?</h3>
            <p>
              Yes, BudgetBuddy is available as a mobile-friendly platform,
              allowing you to manage your expenses on the go with ease.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3>5. Do I need any financial knowledge to use BudgetBuddy?</h3>
            <p>
              Not at all! BudgetBuddy is designed to be user-friendly and easy
              to navigate. It offers simple tools that help you manage your
              finances, regardless of your financial expertise.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
