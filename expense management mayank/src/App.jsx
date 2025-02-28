import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ManageExpense from "./pages/ManageExpense"; // Example additional pages
import ManageIncome from "./pages/ManageIncome";
import Layout from "./components/Layout";
import TrackExpenses from "./pages/TrackExpenses";
import NewSheet from "./pages/NewSheet";
import MonthlyReport from "./pages/MonthlyReport";
import ExpenseDetail from "./components/ExpenseDetails";
import IncomeDetail from "./components/IncomeDetail";
import DirectExpense from "./pages/DirectExpense";
import DirectIncome from "./pages/DirectIncome";
import TrackIncome from "./pages/TrackIncome";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without the SideBar */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Routes with the Layout (SideBar included) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/getById-expense/:_id" element={<ExpenseDetail />} />
          <Route path="/getById-income/:_id" element={<IncomeDetail />} />
          <Route path="/manage-expense" element={<ManageExpense />} />
          <Route path="/manage-income" element={<ManageIncome />} />
          <Route path="/direct-income" element={<DirectIncome />} />
          <Route path="/direct-expense" element={<DirectExpense />} />
          <Route path="/track-expenses" element={<TrackExpenses />} />
          <Route path="/track-income" element={<TrackIncome />} />
          <Route path="/new-sheet" element={<NewSheet />} />
          <Route path="/monthly-report" element={<MonthlyReport />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
