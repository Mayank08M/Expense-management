import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sayingNo from "../assets/images/sayingNo.png";
import apiService from "../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import { MdOutlineDelete, MdOutlineCancel, MdDelete } from "react-icons/md";
import DataGrid from "react-data-grid";

const TrackIncome = () => {
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editEntry, setEditEntry] = useState({});

  useEffect(() => {
    const fetchIncomeDetails = async () => {
      try {
        const response = await apiService.getAllDirectIncome();
        const result = response.data;

        if (result.success && result.data.length > 0) {
          const sheet = result.data[0];

          setColumns([
            ...Object.keys(sheet)
              .filter((key) => key !== "entryId")
              .map((key) => ({
                key,
                name: key.replace(/([A-Z])/g, " $1").trim(),
                editable: key !== "_id",
              })),
            { key: "actions", name: "Actions", editable: false },
          ]);

          setRows(
            result.data.map((entry, index) => ({
              id: index + 1,
              ...entry,
            }))
          );
        } else {
          setRows([]); // Set rows to an empty array when no data is found
        }
      } catch (err) {
        if (err.response?.status === 400) {
          toast.error("Session expired, redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
        } else if (err.response?.status === 404) {
          setRows([]); // Ensure rows are empty to show "No Data Found"
        } else {
          toast.error("Error fetching data. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchIncomeDetails();
  }, []);

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
      const payload = { entryId: editEntry.entryId, data: editEntry };
      const response = await apiService.updateDirectIncome(payload);

      if (response.data.success) {
        setRows((prevRows) => {
          const updatedRows = [...prevRows];
          updatedRows[editIndex] = editEntry;
          return updatedRows;
        });

        setEditIndex(null);
        setEditEntry({});
        toast.success(response.data.message || "Entry updated successfully!");
      } else {
        toast.error("Failed to update entry");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating entry. Please try again.");
    }
  };

  const handleDelete = async (entryId) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await apiService.deleteDirectIncome(entryId);
        setRows((prevRows) => prevRows.filter((row) => row.entryId !== entryId));
        toast.success("Entry deleted successfully!");
      } catch (err) {
        toast.error(err.response?.data?.message || "Error deleting entry. Please try again.");
      }
    }
  };

  const handleDeleteAll = async () => {
    if (rows.length === 0) {
      toast.info("No entries to delete");
      return;
    }

    if (window.confirm("Are you sure you want to delete all entries?")) {
      try {
        await apiService.deleteAllDirectIncome();
        toast.success("All entries deleted successfully!");
        setRows([]);
      } catch (err) {
        toast.error(err.response?.data?.message || "Error deleting entries. Please try again.");
      }
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
        Track Direct Income
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : rows.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={sayingNo} height={300} width={300} alt="No List" />
          <h3>Sorry, No Data Found</h3>
        </div>
      ) : (
        <div>
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

          <button
            onClick={handleDeleteAll}
            style={{
              marginTop: "5px",
              padding: "8px",
              background: "red",
              color: "white",
            }}
          >
            <MdDelete style={{ marginRight: "5px" }} /> Delete All
          </button>

          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default TrackIncome;
