import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RecommendationPage from "./components/RecommendationPage";
import TripCustomizationPage from "./components/TripCustomizationPage";
import BookingsPage from "./components/BookingsPage";
import HotelsPage from "./components/HotelsPage";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<RecommendationPage />} />
        <Route
          path="/customize/:destinationId"
          element={<TripCustomizationPage />}
        />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
