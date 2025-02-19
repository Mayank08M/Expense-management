import { Chart } from "primereact/chart";
import React, { useState, useEffect, useRef } from "react";
import apiService from "../services/api.service";

const Dashboard = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [expenseCategories, setExpenseCategories] = useState([]);
  const apiCalled = useRef(false); // ✅ Prevent duplicate API calls

  // Predefined colors for categories
  const categoryColors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFD700"];

  useEffect(() => {
    const fetchExpenseCategories = async () => {
      if (apiCalled.current) return; // ✅ Prevent duplicate API calls
      apiCalled.current = true;

      try {
        const response = await apiService.getExpenseCategoryPercentage();
        console.log("Fetched expense categories:", response.data);

        // Extract data and assign colors manually
        const data = Array.isArray(response.data.data) ? response.data.data : [];

        // Assign colors dynamically based on index
        const coloredData = data.map((item, index) => ({
          ...item,
          color: categoryColors[index % categoryColors.length], // Cycle through predefined colors
        }));

        setExpenseCategories(coloredData);
      } catch (error) {
        console.error("Error fetching expense categories:", error);
        setExpenseCategories([]); // Ensure it's always an array
      }
    };

    fetchExpenseCategories();
  }, []);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    const data = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Income",
          backgroundColor: "#007bff",
          borderColor: "#007bff",
          data: [65, 59, 80, 81, 50],
        },
        {
          label: "Expenses",
          backgroundColor: "#ff0000",
          borderColor: "#ff0000",
          data: [28, 48, 40, 19, 40],
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <>
      <div style={{ textAlign: "left", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Welcome to Dashboard
      </div>
      <Chart type="bar" data={chartData} options={chartOptions} />

      {/* Expense Distribution Meter */}
      <div className="meter-group-container" style={{ marginTop: "30px", fontSize: "14px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          width: "80%",
          height: "15px",
          backgroundColor: "#e0e0e0",
          borderRadius: "10px",
          overflow: "hidden",
          margin: "0 auto 10px auto",
        }}>
          {expenseCategories.map((item, index) => (
            <div key={index} style={{
              backgroundColor: item.color,
              width: `${item.percentage}`,
              height: "100%",
            }} title={`${item.category} (${item.percentage})`}>
            </div>
          ))}
        </div>

        {/* Labels */}
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
          {expenseCategories.map((item, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ display: "inline-block", width: "10px", height: "10px", backgroundColor: item.color, borderRadius: "50%" }}></span>
              <span style={{ fontWeight: "500" }}>{item.category}</span>
              <span style={{ color: "#666" }}>({item.percentage})</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
