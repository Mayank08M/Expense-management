import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import apiService from "../services/api.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const DirectIncome = () => {
  const [incomeFrom, setIncomeFrom] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("");
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // API Call to Create a New Income Entry
  const handleCreateIncome = async () => {
    if (!incomeFrom || !incomeCategory || amount === null) {
      toast.error("Please fill all required fields except description.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const payload = {
      incomeFrom,
      incomeCategory,
      amount,
      description,
    };

    setLoading(true);

    try {
      const response = await apiService.createDirectIncome(payload);

      if (response.data) {
        toast.success(response.data.message || "Income added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });

        // Reset form fields
        setIncomeFrom("");
        setIncomeCategory("");
        setAmount(null);
        setDescription("");
      } else {
        toast.error(response.message || "Failed to add income.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Error adding income:", err);
      const statusCode = err.response?.status;

      if (statusCode === 400) {
        navigate("/login");
      } else {
        const errorMessage =
          err.response?.data?.message || "Error adding income. Please try again.";
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
        Add Income
      </div>

      {/* Income From Input */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label style={{ fontWeight: "bold", width: "150px" }}>Income From:</label>
        <InputText
          value={incomeFrom}
          onChange={(e) => setIncomeFrom(e.target.value)}
          placeholder="Enter source"
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

      {/* Income Category Dropdown */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label style={{ fontWeight: "bold", width: "150px" }}>Income Category:</label>
        <select
          value={incomeCategory}
          onChange={(e) => setIncomeCategory(e.target.value)}
          style={{
            width: "40%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: "white",
            color: incomeCategory ? "#000" : "#888",
            marginTop: "5px",
          }}
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Job">Job</option>
          <option value="Investments">Investments</option>
          <option value="Side hustle">Side hustle</option>
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
          value={amount || 0}
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

      {/* Create Income Button */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleCreateIncome}
          disabled={loading}
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "4px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Adding..." : "Add Income"}
        </button>
      </div>
    </>
  );
};

export default DirectIncome;
