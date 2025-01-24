import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SideBar from './components/SideBar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/sidebar" element={<SideBar />} /> */}
          {/* <Route path="/contact" element={<SignUp />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
