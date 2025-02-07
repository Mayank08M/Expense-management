import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import nolist from "../assets/images/nolist.png";
import apiService from "../services/api.service"; // Import API service

const ManageExpense = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // To prevent state updates after unmounting

    const fetchExpenses = async () => {
      try {
        const response = await apiService.getAllExpenseSheets();
        if (isMounted) setData(response.data?.data || []);
      } catch (err) {
        if (isMounted) setError("Failed to fetch data");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchExpenses();

    return () => {
      isMounted = false; // Cleanup function to prevent memory leaks
    };
  }, []);

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
        Manage Expense
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
                      <button style={{ padding: "5px 15px", marginBottom: "5px" }}>
                        View
                      </button>
                    </NavLink>
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
