import React, { useState, useEffect } from "react";
import sayingNo from "../assets/images/sayingNo.png";
import { Chart } from "primereact/chart";
import apiService from "../services/api.service";

const MonthlyReport = () => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await apiService.getThirtyDaysData();
        if (response.data.data.length === 0) {
          setChartData(null);
          return;
        }

        const totalIncome = response.data.data.reduce((sum, entry) => sum + entry.totalIncome, 0);
        const totalExpense = response.data.data.reduce((sum, entry) => sum + entry.totalExpense, 0);
        const totalSavings = totalIncome - totalExpense;

        const data = {
          labels: ["Total Income", "Total Expense", "Savings"],
          datasets: [
            {
              data: [totalIncome, totalExpense, totalSavings],
              backgroundColor: ["#4285F4", "#EA4335", "#34A853"], // Blue, Red, Green
              hoverBackgroundColor: ["#357AE8", "#D93025", "#2C9B47"],
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setChartData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    setChartOptions({
      plugins: {
        legend: {
          display: false, // Hide default legend
        },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(0,0,0,0.7)",
          titleFont: { size: 14 },
          bodyFont: { size: 12 },
          displayColors: false,
        },
      },
      cutout: "70%",
      responsive: true,
      maintainAspectRatio: false,
    });
  }, []);

  return (
    <>
      <div style={{ textAlign: "left", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Monthly Report
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : chartData === null ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={sayingNo} height={300} width={300} alt="No Data" />
          <h3>Sorry, No Data Found</h3>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
          {/* Chart */}
          <div className="card flex justify-content-center" style={{ width: "350px", height: "350px" }}>
            <Chart type="doughnut" data={chartData} options={chartOptions} />
          </div>

          {/* Custom Legend */}
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "20px", height: "10px", backgroundColor: "#4285F4", display: "inline-block" }}></span>
              <span>Total Income</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "20px", height: "10px", backgroundColor: "#EA4335", display: "inline-block" }}></span>
              <span>Total Expense</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "20px", height: "10px", backgroundColor: "#34A853", display: "inline-block" }}></span>
              <span>Savings</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MonthlyReport;
