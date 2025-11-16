import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Routes/SignUp";
import Login from "./Routes/Login";
import HomePage from "./Routes/HomePage";
import RecommendationPage from "./Routes/RecommendationPage";
import TripCustomizationPage from "./Routes/TripCustomizationPage";
import BookingsPage from "./Routes/BookingsPage";
import HotelsPage from "./Routes/HotelsPage";
import Navbar from "./components/Navbar";
import Experiences from "./Routes/Experience";
import Profile from "./Routes/Profile";
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
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </Router>
  );
}

export default App;
