import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import nolist from "../assets/images/nolist.png";
import apiService from "../services/api.service"; // Import API service

const ManageIncome = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // To prevent state updates after unmounting

    const fetchIncomes = async () => {
      try {
        const response = await apiService.getAllIncomeSheets();
        if (isMounted) setData(response.data?.data || []);
      } catch (err) {
        if (err?.status === 400) {
          navigate("/login");
        } else if (isMounted) setError("Failed to fetch data");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchIncomes();

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
        Manage Income
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
              <button>Create New Income List</button>
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
              {data.map((income) => (
                <tr key={income._id}>
                  <td>{income.name}</td>
                  <td>{income.type}</td>
                  <td>{new Date(income.createdAt).toLocaleDateString()}</td>
                  <td>
                    <NavLink to={`/getById-income/${income._id}`}>
                      <button
                        style={{ padding: "5px 15px", marginBottom: "5px" }}
                      >
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

export default ManageIncome;
