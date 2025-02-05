import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import nolist from "../assets/images/nolist.png";

const ManageExpense = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BASE_URL + "api/sheet/getAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("authToken"), // Change this line
          },
        }); // Replace with actual API URL
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
          <table border="1" style={{ width: "100%", textAlign: "left" }}>
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
                    <NavLink to={`/expense/${expense._id}`}>
                      <button>View</button>
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
