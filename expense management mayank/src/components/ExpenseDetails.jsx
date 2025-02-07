import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";
import apiService from "../services/api.service";

const ExpenseDetail = () => {
  const { _id } = useParams();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({});

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        const { data } = await apiService.getExpenseDetails(_id);
        if (data.success && data.data.length > 0) {
          const sheet = data.data[0];

          // Dynamically setting columns
          setColumns(
            sheet.columns.map((column) => ({
              key: column.toLowerCase().replace(/\s+/g, ""), // Cleaned key for use in input names
              name: column,
              editable: true,
            }))
          );

          // Setting rows with dynamic columns
          setRows(
            sheet.entries.map((entry, index) => ({
              id: index + 1,
              ...entry,
            }))
          );
        } else {
          setError("No sheet data available");
        }
      } catch (err) {
        setError("Failed to fetch details");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenseDetails();
  }, [_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddEntry = async () => {
    try {
      // Send the object directly (newEntry) without converting it into an array
      const { data } = await apiService.addExpenseEntry(_id, newEntry);
      
      if (data.success) {
        setRows((prevRows) => [...prevRows, { id: prevRows.length + 1, ...newEntry }]);
        setShowForm(false);
        setNewEntry({});
      } else {
        setError("Failed to add entry");
      }
    } catch (err) {
      setError("Error adding entry");
    }
  };

  const toggleForm = () => setShowForm(!showForm);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Expense Sheet</h2>

      <button onClick={toggleForm} style={{ marginBottom: "20px" }}>
        {showForm ? "Cancel" : "Add Entry"}
      </button>

      {showForm && (
        <div style={{ marginBottom: "20px" }}>
          {columns.map((column) => (
            column.name !== "Category" ? (
              <input
                key={column.key}
                type="text"
                name={column.key}
                placeholder={column.name}
                value={newEntry[column.key] || ""}
                onChange={handleInputChange}
                style={{ marginRight: "10px" }}
              />
            ) : (
              <select
                key={column.key}
                name={column.key}
                value={newEntry[column.key] || ""}
                onChange={handleInputChange}
                style={{ marginRight: "10px" }}
              >
                <option value="Essentials">Essentials</option>
                <option value="Investments">Investments</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            )
          ))}
          <button onClick={handleAddEntry}>Save Entry</button>
        </div>
      )}

      <DataGrid columns={columns} rows={rows} defaultColumnOptions={{ resizable: true }} style={{ height: 400 }} />
    </div>
  );
};

export default ExpenseDetail;
