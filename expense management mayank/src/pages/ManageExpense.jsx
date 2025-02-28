import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import nolist from "../assets/images/nolist.png";
import apiService from "../services/api.service";

const ManageExpense = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hasFetched = useRef(false); // Use a ref to check if data is fetched

  useEffect(() => {
    if (hasFetched.current) return; // Prevent multiple API calls

    const fetchExpenses = async () => {
      try {
        const response = await apiService.getAllExpenseSheets();

        if (response.data?.data) {
          setData(response.data.data); // Store fetched data
        } else {
          setData([]); // If no sheets found, set data to an empty array
        }
      } catch (err) {
        if (err?.response?.status === 400) {
          navigate("/login"); // Redirect to login if unauthorized
        } else {
          console.error("API Error:", err); // Log the error for debugging
          setData([]); // Treat failed fetch as "no data" instead of an error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
    hasFetched.current = true; // Mark that data has been fetched
  }, [navigate]);

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this sheet?")) {
      try {
        await apiService.deleteSheet(_id);
        setData((prevRows) =>
          prevRows.filter((row) => row._id !== _id)
        );
        toast.success("Sheet deleted successfully!", { autoClose: 1000 });
      } catch (err) {
        toast.error("Error deleting sheet. Please try again.", {
          position: "top-center",
          autoClose: 4000,
        });
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
        Expense Sheets
      </div>
      {data === null || data.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img src={nolist} height={300} width={300} alt="No List" />
          </div>
          <div>
            <NavLink to="/new-sheet">
              <button>Create New Expense List</button>
            </NavLink>
          </div>
        </div>
      ) : (
        <div>
          <table style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>Sheet Name</th>
                <th>List Type</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((expense) => (
                <tr key={expense._id}>
                  <td>{expense.name}</td>
                  <td>{expense.type}</td>
                  <td>{new Date(expense.createdAt).toLocaleDateString()}</td>
                  <td>
                    <NavLink to={`/getById-expense/${expense._id}`}>
                      <button
                        style={{ padding: "5px 15px", marginBottom: "5px" }}
                      >
                        View
                      </button>
                    </NavLink>
                    <button
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "red",
                        color: "white",
                        border: "2px solid red",
                        cursor: "pointer",
                        transition: "0.3s ease",
                        marginLeft: "5px",
                      }}
                      onClick={() => handleDelete(expense._id)}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "white"; // White background on hover
                        e.target.style.borderColor = "red"; // Yellow border on hover
                        e.target.style.color = "red"; // Text color changes to red

                        // Change the icon color by modifying the first child (assuming it's the icon)
                        const icon = e.currentTarget.firstChild;
                        if (icon) icon.style.color = "red"; // Change icon color to red
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "red"; // Reset background
                        e.target.style.borderColor = "red"; // Reset border
                        e.target.style.color = "white"; // Reset text color

                        const icon = e.currentTarget.firstChild;
                        if (icon) icon.style.color = "white"; // Reset icon color to white
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ManageExpense;
