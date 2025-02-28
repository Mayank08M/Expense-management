import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

const NewSheet = () => {
  const [value, setValue] = useState(""); // Sheet Name
  const [isFocused, setIsFocused] = useState(false); // Focus state
  const [listType, setListType] = useState(""); // Expense/Income
  const [columnsCount, setColumnsCount] = useState(0); // Number of columns
  const [columns, setColumns] = useState([]); // Column names
  const [loading, setLoading] = useState(false); // API call loading state
  const [message, setMessage] = useState(""); // Success/Error message

  // Handle change in number of columns
  const handleColumnsCountChange = (e) => {
    const count = Number(e.target.value);
    setColumnsCount(count);
    setColumns(Array(count).fill("")); // Reset column names
  };

  // Handle change in column names
  const handleColumnNameChange = (index, value) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = value;
    setColumns(updatedColumns);
  };

  // API Call to Create a New Sheet
  const handleCreateSheet = async () => {
    if (!value || !listType || columns.length === 0) {
      setMessage("Please fill all fields.");
      return;
    }

    if (!columns.includes("Category")) {
      setMessage("Columns must include 'Category'.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "api/sheet/new-sheet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("authToken"), // Change this line
          },
          body: JSON.stringify({
            name: value,
            type: listType,
            columns,
            entries: [], // Assuming empty entries initially
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Sheet created successfully!");
        setValue("");
        setListType("");
        setColumnsCount(0);
        setColumns([]);
      } else {
        setMessage(data.message || "Failed to create sheet.");
      }
    } catch (error) {
      setMessage("Error creating sheet. Please try again.");
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
        New Sheet
      </div>

      {/* Sheet Name Input */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
          <InputText
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
          <label
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

      {/* List Type Dropdown */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <div style={{ position: "relative", width: "100%", maxWidth: "400px"  }}>
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
            }}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
          <label
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
          marginBottom: "30px",
        }}
      >
        <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
          <InputText
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
          <label
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
            style={{ position: "relative", width: "100%", maxWidth: "400px" }}
          >
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
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleCreateSheet}
          disabled={loading}
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "20px",
            padding: "10px 20px",
            borderRadius: "4px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Creating..." : "Create Sheet"}
        </button>
      </div>

      {/* Message Display */}
      {message && (
        <p
          style={{
            textAlign: "center",
            color: message.includes("success") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </>
  );
};

export default NewSheet;
        