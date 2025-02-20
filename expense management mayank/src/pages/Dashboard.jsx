import { Chart } from "primereact/chart";
import React, { useState, useEffect, useRef } from "react";
import apiService from "../services/api.service";

const Dashboard = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const expenseApiCalled = useRef(false); // ✅ Separate API call flag for expenses
  const incomeApiCalled = useRef(false);
  const chartApiCalled = useRef(false);

  // Predefined colors for categories
  const categoryColors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#FFD700",
  ];

  useEffect(() => {
    const fetchExpenseCategories = async () => {
      if (expenseApiCalled.current) return; // ✅ Prevent duplicate API calls for expenses
      expenseApiCalled.current = true;

      try {
        const response = await apiService.getExpenseCategoryPercentage();
        console.log("Fetched expense categories:", response.data);

        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        const coloredData = data.map((item, index) => ({
          ...item,
          color: categoryColors[index % categoryColors.length],
        }));

        setExpenseCategories(coloredData);
      } catch (error) {
        console.error("Error fetching expense categories:", error);
        setExpenseCategories([]);
      }
    };

    fetchExpenseCategories();
  }, []);

  useEffect(() => {
    const fetchIncomeCategories = async () => {
      if (incomeApiCalled.current) return; // ✅ Prevent duplicate API calls for income
      incomeApiCalled.current = true;

      try {
        const response = await apiService.getIncomeCategoryPercentage();
        console.log("Fetched income categories:", response.data);

        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        const coloredData = data.map((item, index) => ({
          ...item,
          color: categoryColors[index % categoryColors.length],
        }));

        setIncomeCategories(coloredData);
      } catch (error) {
        console.error("Error fetching income categories:", error);
        setIncomeCategories([]);
      }
    };

    fetchIncomeCategories();
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      if (chartApiCalled.current) return; // Prevent duplicate API call
      chartApiCalled.current = true;
      try {
        const response = await apiService.getFiveMonthsData();

        if (response.data && response.data.data) {
          // Month mapping for labels
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          // Process the API response
          const formattedData = response.data.data.map((item) => ({
            label: `${monthNames[item._id.month - 1]} ${item._id.year}`, // Convert month number to name
            income: item.totalIncome || 0,
            expense: item.totalExpense || 0,
          }));

          // Extract labels, income, and expenses
          const labels = formattedData.map((item) => item.label);
          const income = formattedData.map((item) => item.income);
          const expenses = formattedData.map((item) => item.expense);

          // Prepare chart data
          const data = {
            labels,
            datasets: [
              {
                label: "Income",
                backgroundColor: "#007bff",
                borderColor: "#007bff",
                data: income,
              },
              {
                label: "Expenses",
                backgroundColor: "#ff0000",
                borderColor: "#ff0000",
                data: expenses,
              },
            ],
          };

          setChartData(data);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: { weight: 500 },
          },
          grid: { display: false, drawBorder: false },
        },
        y: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder, drawBorder: false },
        },
      },
    };

    setChartOptions(options);
  }, []);

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
        Welcome to Dashboard
      </div>
      <Chart type="bar" data={chartData} options={chartOptions} />

      <h3>Category Wise Expense Meter</h3>

      {expenseCategories.length > 0 ? (
        <div
          className="meter-group-container"
          style={{ marginTop: "30px", fontSize: "14px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "80%",
              height: "15px",
              backgroundColor: "#e0e0e0",
              borderRadius: "10px",
              overflow: "hidden",
              margin: "0 auto 10px auto",
            }}
          >
            {expenseCategories.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: item.color,
                  width: `${item.percentage}`,
                  height: "100%",
                }}
                title={`${item.category} (${item.percentage})`}
              ></div>
            ))}
          </div>

          {/* Labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10px",
            }}
          >
            {expenseCategories.map((item, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    backgroundColor: item.color,
                    borderRadius: "50%",
                  }}
                ></span>
                <span style={{ fontWeight: "500" }}>{item.category}</span>
                <span style={{ color: "#666" }}>({item.percentage})</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p
          style={{ textAlign: "center", fontWeight: "bold", color: "#ff0000" }}
        >
          Please make a expense sheet with amount to get data.
        </p>
      )}

      <h3>Category Wise Income Meter</h3>

      {incomeCategories.length > 0 ? (
        <div
          className="meter-group-container"
          style={{ marginTop: "30px", fontSize: "14px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "80%",
              height: "15px",
              backgroundColor: "#e0e0e0",
              borderRadius: "10px",
              overflow: "hidden",
              margin: "0 auto 10px auto",
            }}
          >
            {incomeCategories.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: item.color,
                  width: `${item.percentage}`,
                  height: "100%",
                }}
                title={`${item.category} (${item.percentage})`}
              ></div>
            ))}
          </div>

          {/* Labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10px",
            }}
          >
            {incomeCategories.map((item, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    backgroundColor: item.color,
                    borderRadius: "50%",
                  }}
                ></span>
                <span style={{ fontWeight: "500" }}>{item.category}</span>
                <span style={{ color: "#666" }}>({item.percentage})</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p
          style={{ textAlign: "center", fontWeight: "bold", color: "#ff0000" }}
        >
          Please make a income sheet with amount to get data.
        </p>
      )}
    </>
  );
};

export default Dashboard;
