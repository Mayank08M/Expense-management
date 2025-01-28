import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

const NewSheet = () => {
  const [value, setValue] = useState(""); // For input value (Sheet Name)
  const [isFocused, setIsFocused] = useState(false); // For tracking focus state
  const [listType, setListType] = useState(""); // For dropdown value (Expense/Income)
  const [columnsCount, setColumnsCount] = useState(0); // For number of columns
  const [columns, setColumns] = useState([]); // For column names

  // Function to handle the number of columns input change
  const handleColumnsCountChange = (e) => {
    const count = e.target.value;
    setColumnsCount(count);
    setColumns(Array(Number(count)).fill("")); // Initialize columns with empty values
  };

  // Function to handle column name change
  const handleColumnNameChange = (index, value) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = value;
    setColumns(updatedColumns);
  };

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
          marginBottom: "30px", // Added gap between fields
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          {/* Input Field for Sheet Name */}
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
          {/* Floating Label for Sheet Name */}
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
          marginBottom: "30px", // Added gap between fields
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
              top: listType ? "-8px" : "50%",
              fontSize: listType ? "12px" : "16px",
              transform: "translateY(-50%)",
              transition: "0.2s ease-in-out",
              background: "white",
              padding: "0 5px",
            }}
          >
            List Type
          </label>
        </div>
      </div>

      {/* Input for Number of Columns */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px", // Added gap between fields
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          {/* Input Field for Number of Columns */}
          <InputText
            id="columnsCount"
            type="number"
            value={columnsCount}
            onChange={handleColumnsCountChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {/* Floating Label for Number of Columns */}
          <label
            htmlFor="columnsCount"
            style={{
              position: "absolute",
              left: "10px",
              top: columnsCount ? "-8px" : "50%",
              fontSize: columnsCount ? "12px" : "16px",
              transform: "translateY(-50%)",
              transition: "0.2s ease-in-out",
              background: "white",
              padding: "0 5px",
            }}
          >
            Number of Columns
          </label>
        </div>
      </div>

      {/* Dynamic Column Name Inputs */}
      {Array.from({ length: columnsCount }).map((_, index) => (
        <div
          key={index}
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
            {/* Column Name Input */}
            <InputText
              value={columns[index]}
              onChange={(e) => handleColumnNameChange(index, e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            {/* Floating Label for Column Name */}
            <label
              style={{
                position: "absolute",
                left: "10px",
                top: columns[index] ? "-8px" : "50%",
                fontSize: columns[index] ? "12px" : "16px",
                transform: "translateY(-50%)",
                transition: "0.2s ease-in-out",
                background: "white",
                padding: "0 5px",
              }}
            >
              Column {index + 1} Name
            </label>
          </div>
        </div>
      ))}

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
