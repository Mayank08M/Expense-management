import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";
import apiService from "../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const ExpenseDetail = () => {
  const { _id } = useParams();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [editEntry, setEditEntry] = useState({});
  const [sheetName, setSheetName] = useState("");

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        const { data } = await apiService.getExpenseDetails(_id);

        if (data.success && data.data.length > 0) {
          const sheet = data.data[0];
          setSheetName(sheet.name || "Expense Sheet");
          setColumns([
            ...sheet.columns.map((column) => ({
              key: column.toLowerCase().replace(/\s+/g, ""),
              name: column,
              editable: true,
            })),
            { key: "actions", name: "Actions", editable: false },
          ]);

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
      const { data } = await apiService.addExpenseEntry(_id, newEntry);

      if (data.success) {
        setRows((prevRows) => [
          ...prevRows,
          { entryId: data.data.entryId, ...newEntry }, // Use correct entryId from backend
        ]);
        setShowForm(false);
        setNewEntry({});
        toast.success("Entry added successfully!", { autoClose: 1000 });
      } else {
        toast.error(data.message || "Failed to add entry", { autoClose: 1000 });
      }
    } catch (err) {
      console.error("Error adding entry:", err);
      const errorMessage =
        err.response?.data?.message || "Error adding entry. Please try again.";
      toast.error(errorMessage, { position: "top-center", autoClose: 5000 });
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditEntry({ ...rows[index] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    if (editIndex === null) return;

    try {
      const payload = { entryId: editEntry.entryId, data: editEntry }; // Ensure correct format
      const { data } = await apiService.updateEntry(_id, payload);

      if (data.success) {
        setRows((prevRows) => {
          const updatedRows = [...prevRows];
          updatedRows[editIndex] = editEntry;
          return updatedRows;
        });

        setEditIndex(null);
        setEditEntry({});
        toast.success("Entry updated successfully!", { autoClose: 1000 });
      } else {
        toast.error("Failed to update entry", { autoClose: 1000 });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Error updating entry. Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 4000,
      });
    }
  };

  const handleDelete = async (entryId) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await apiService.deleteEntry(_id, entryId);
        setRows((prevRows) =>
          prevRows.filter((row) => row.entryId !== entryId)
        );
        toast.success("Entry deleted successfully!", { autoClose: 1000 });
      } catch (err) {
        toast.error("Error deleting entry. Please try again.", {
          position: "top-center",
          autoClose: 4000,
        });
      }
    }
  };

  const toggleForm = () => setShowForm(!showForm);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "10px" }}>
      <h2 style={{ margin: "10px 0" }}>{sheetName}</h2>

      <button onClick={toggleForm} style={{ marginBottom: "10px" }}>
        {showForm ? "Cancel" : "Add Entry"}
      </button>

      {showForm && (
        <div style={{ marginBottom: "20px" }}>
          {columns.map((column) =>
            column.key !== "actions" ? (
              <input
                key={column.key}
                type="text"
                name={column.key}
                placeholder={column.name}
                value={newEntry[column.key] || ""}
                onChange={handleInputChange}
                style={{ marginRight: "10px" }}
              />
            ) : null
          )}
          <button onClick={handleAddEntry}>Save Entry</button>
        </div>
      )}

      <DataGrid
        columns={[
          ...columns.filter((col) => col.key !== "actions"),
          {
            key: "actions",
            name: "Actions",
            renderCell: ({ row }) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {editIndex === row.id - 1 ? (
                  <>
                    <button
                      style={{
                        padding: "2px 4px",
                        background: "#4CAF50",
                        color: "white",
                      }}
                      onClick={handleSaveEdit}
                    >
                      <FaRegSave />
                    </button>
                    <button
                      style={{
                        padding: "2px 4px",
                        background: "#f44336",
                        color: "white",
                        marginLeft: "10px",
                      }}
                      onClick={() => setEditIndex(null)}
                    >
                      <MdOutlineCancel />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={{
                        padding: "2px 4px",
                        background: "#ff9800",
                        color: "white",
                      }}
                      onClick={() => handleEditClick(row.id - 1)}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      style={{
                        padding: "2px 4px",
                        background: "#f44336",
                        color: "white",
                        marginLeft: "10px",
                      }}
                      onClick={() => handleDelete(row.entryId)}
                    >
                      <MdOutlineDelete />
                    </button>
                  </>
                )}
              </div>
            ),
          },
        ]}
        rows={rows.map((row, index) =>
          editIndex === index
            ? {
                ...row,
                ...Object.fromEntries(
                  columns
                    .filter((col) => col.editable)
                    .map((col) => [
                      col.key,
                      <input
                        type="text"
                        name={col.key}
                        value={editEntry[col.key] || ""}
                        onChange={handleEditChange}
                      />,
                    ])
                ),
              }
            : row
        )}
        defaultColumnOptions={{ resizable: true }}
        style={{ height: 400 }}
      />
      <ToastContainer />
    </div>
  );
};

export default ExpenseDetail;
