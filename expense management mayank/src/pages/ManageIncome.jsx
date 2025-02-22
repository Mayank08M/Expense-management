import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import nolist from "../assets/images/nolist.png";
import apiService from "../services/api.service";

const ManageIncome = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const hasFetched = useRef(false);  // Use a ref to check if data is fetched

  useEffect(() => {
    if (hasFetched.current) return;  // Prevent multiple API calls
  
    const fetchIncome = async () => {
      try {
        const response = await apiService.getAllIncomeSheets();
  
        if (response.data?.data) {
          setData(response.data.data);  // Store fetched data
        } else {
          setData([]); // If no sheets found, set data to an empty array
        }
      } catch (err) {
        if (err?.response?.status === 400) {
          navigate("/login");  // Redirect to login if unauthorized
        } else {
          console.error("API Error:", err); // Log the error for debugging
          setData([]); // Treat failed fetch as "no data" instead of an error
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchIncome();
    hasFetched.current = true;  // Mark that data has been fetched
  }, [navigate]);
  

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
        Income Sheets
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

export default ManageIncome;
