import { Chart } from "primereact/chart";
import React, { useState, useEffect } from "react";
import { MeterGroup } from "primereact/metergroup";

const Dashboard = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
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
  const values = [
    { label: "Essentials", color: "#34d399", value: 16 },
    { label: "Investments", color: "#fbbf24", value: 8 },
    { label: "Entertainment", color: "#60a5fa", value: 24 },
    { label: "Other", color: "#c084fc", value: 10 },
  ];
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
      {/* <div className="card flex justify-content-center">
            <MeterGroup values={values} />
        </div> */}
      <div
        className="meter-group-container"
        style={{
          marginTop: "30px",
          fontSize: "14px",
        }}
      >
        {/* Combined Stacked Meter */}
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
          {values.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: item.color,
                width: `${item.value}%`,
                height: "100%",
              }}
              title={`${item.label} (${item.value}%)`}
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
          {values.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
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
              <span style={{ fontWeight: "500" }}>{item.label}</span>
              <span style={{ color: "#666" }}>({item.value}%)</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
