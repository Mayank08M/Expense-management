import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

const NewSheet = () => {
  const [paidFor, setPaidFor] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // API Call to Create a New Expense Entry
  const handleCreateExpense = async () => {
    if (!paidFor || !expenseCategory || amount === null || !description) {
      setMessage("Please fill all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "api/sheet/new-expense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            paidFor,
            expenseCategory,
            amount,
            description,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Expense added successfully!");
        setPaidFor("");
        setExpenseCategory("");
        setAmount(null);
        setDescription("");
      } else {
        setMessage(data.message || "Failed to add expense.");
      }
    } catch (error) {
      setMessage("Error adding expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          textAlign: "left",
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Add Expense
      </div>

      {/* Paid For Input */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label style={{ fontWeight: "bold", width: "150px" }}>Paid For:</label>
        <InputText
          value={paidFor}
          onChange={(e) => setPaidFor(e.target.value)}
          placeholder="Enter payee"
          style={{
            width: "40%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginTop: "5px",
          }}
        />
      </div>

      {/* Expense Category Dropdown */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label style={{ fontWeight: "bold", width: "150px" }}>
          Income's Category:
        </label>
        <select
          value={expenseCategory}
          onChange={(e) => setExpenseCategory(e.target.value)}
          style={{
            width: "40%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: "white",
            color: expenseCategory ? "#000" : "#888",
            marginTop: "5px",
          }}
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Job">Job</option>
          <option value="Side hustle">Side hustle</option>
          <option value="Investments">Investments</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Amount Input */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label style={{ fontWeight: "bold", width: "150px" }}>Amount:</label>
        <InputNumber
          value={amount}
          onValueChange={(e) => setAmount(e.value)}
          placeholder="Enter amount"
          style={{
            width: "40%",
            height: "40px", // Ensuring consistent height
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            resize: "none",
          }}
        />
      </div>

      {/* Description Input */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label
          style={{
            fontWeight: "bold",
            width: "150px",
            alignSelf: "flex-start",
            marginTop: "8px",
          }}
        >
          Description:
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a short description"
          rows="3"
          style={{
            width: "40%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            resize: "none",
          }}
        />
      </div>

      {/* Create Expense Button */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleCreateExpense}
          disabled={loading}
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "4px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </div>

      {/* Message Display */}
      {message && (
        <p
          style={{
            textAlign: "center",
            color: message.includes("success") ? "green" : "red",
            marginTop: "10px",
          }}
        >
          {message}
        </p>
      )}
    </>
  );
};

export default NewSheet;
