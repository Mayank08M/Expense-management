import React from "react";
import sayingNo from "../assets/images/sayingNo.png";

const TrackExpenses = () => {
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
        Track Expenses
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
            <img src={sayingNo} height={300} width={300} alt="No List" />
          </div>
          <div>
            <h3>Sorry No Data Found</h3>
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

export default TrackExpenses;
