import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import apiService from "../services/api.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DirectExpense = () => {
  const [paidFor, setPaidFor] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // API Call to Create a New Expense Entry
  const handleCreateExpense = async () => {
    if (!paidFor || !expenseCategory || amount === null) {
      toast.error("Please fill all required fields except description.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const payload = {
      paidFor,
      expenseCategory,
      amount,
      description,
    };

    setLoading(true);

    try {
      const response = await apiService.createDirectExpense(payload);

      if (response.data) {
        toast.success(response.data.message || "Expense added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });

        // Reset form fields
        setPaidFor("");
        setExpenseCategory("");
        setAmount(null);
        setDescription("");
      } else {
        toast.error(response.message || "Failed to add expense.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Error adding expense:", err);
      const statusCode = err.response?.status;

      if (statusCode === 400) {
        toast.error("Session expired. Redirecting to login...", {
          position: "top-center",
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate("/login");
        }, 3000); // Redirect after 3 seconds
      } else {
        const errorMessage =
          err.response?.data?.message ||
          "Error adding expense. Please try again.";
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
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
          Expense Category:
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
          <option value="Essentials">Essentials</option>
          <option value="Investments">Investments</option>
          <option value="Entertainment">Entertainment</option>
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
          value={amount || 0} // Ensure amount is never undefined
          onValueChange={(e) => setAmount(e.value ?? 0)}
          placeholder="Enter amount"
          style={{
            width: "40%",
            height: "40px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
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
    </>
  );
};

export default DirectExpense;
