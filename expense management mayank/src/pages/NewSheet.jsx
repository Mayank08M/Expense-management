import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

const NewSheet = () => {
  const [value, setValue] = useState(""); // For input value
  const [isFocused, setIsFocused] = useState(false); // For tracking focus state
  const [listType, setListType] = useState(""); // For dropdown value

  return (
    <>
      {/* Title */}
      <div
        style={{
          textAlign: "left",
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        New Sheet
      </div>

      {/* Username Input Field with Floating Label */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          {/* Input Field for Username */}
          <InputText
            id="username"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {/* Floating Label */}
          <label
            htmlFor="username"
            style={{
              position: "absolute",
              left: "10px",
              top: value || isFocused ? "-8px" : "50%",
              fontSize: value || isFocused ? "12px" : "16px",
              transform: "translateY(-50%)",
              transition: "0.2s ease-in-out",
              background: "white",
              padding: "0 5px",
              color: isFocused ? "#007bff" : "#888",
            }}
          >
            Sheet Name
          </label>
        </div>
      </div>

      {/* List Type Dropdown with Floating Label */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          {/* Dropdown for List Type */}
          <select
            value={listType}
            onChange={(e) => setListType(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              background: "white",
              color: listType ? "#000" : "#888",
              paddingRight: "30px", // Add extra padding to the right to account for the dropdown arrow
            }}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          {/* Floating Label for Dropdown */}
          <label
            htmlFor="listType"
            style={{
              position: "absolute",
              left: "10px",
              top: listType || isFocused ? "-8px" : "50%",
              fontSize: listType || isFocused ? "12px" : "16px",
              transform: "translateY(-50%)",
              transition: "0.2s ease-in-out",
              background: "white",
              padding: "0 5px",
              color: isFocused ? "#007bff" : "#888",
            }}
          >
            List Type
          </label>
        </div>
      </div>

      {/* Create Sheet Button */}
      <div
        style={{
          textAlign: "center",
        }}
      >
        <button
          style={{
            textAlign: "left",
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Create Sheet
        </button>
      </div>
    </>
  );
};

export default NewSheet;
