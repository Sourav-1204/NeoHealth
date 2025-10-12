import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AllDoctor from "./pages/AllDoctor";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import Login from "./pages/login";
import Footer from "./components/Footer";
import Appointment from "./pages/Appointment";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: "0", behavior: "smooth" });
  }, [pathname]);
};

function App() {
  return (
    <div className="w-full h-full">
      <ToastContainer />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<AllDoctor />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors/:speciality" element={<AllDoctor />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
