import React from "react";
import nolist from "../assets/images/nolist.png";
import { NavLink } from "react-router-dom";

const ManageIncome = () => {
  const data = null;
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
      {data === null ? ( // Conditional rendering for when data is null
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
          {/* Render something else when data is not null */}
          <p>Data is available.</p>
        </div>
      )}
    </>
  );
};

export default ManageIncome;
