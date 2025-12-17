import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Routes/SignUp";
import Login from "./Routes/Login";
import HomePage from "./Routes/HomePage";
import RecommendationPage from "./Routes/RecommendationPage";
import TripCustomizationPage from "./Routes/TripCustomizationPage";
import BookingsPage from "./Routes/BookingsPage";
import HotelsPage from "./Routes/HotelsPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Experiences from "./Routes/Experience";
import Profile from "./Routes/Profile";
import PrivateRoute from "./Routes/PrivateRoute";
import Admin from "./Routes/Admin";
import AdminGuard from "./components/admin/AdminGuard";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<RecommendationPage />} />
        <Route
          path="/customize/:destinationId"
          element={<TripCustomizationPage />}
        />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route
          path="/hotels"
          element={
            <PrivateRoute>
              <HotelsPage />
            </PrivateRoute>
          }
        />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <Admin />
            </AdminGuard>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
