import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
=======
import HomePage from "./components/HomePage";
import RecommendationPage from "./components/RecommendationPage";
import TripCustomizationPage from "./components/TripCustomizationPage";
import BookingsPage from "./components/BookingsPage";
import HotelsPage from "./components/HotelsPage";
import Navbar from "./components/Navbar";
import "./App.css";
>>>>>>> 458721b679c2925227cd0294a1153063103e9eaa

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
=======
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
>>>>>>> 458721b679c2925227cd0294a1153063103e9eaa
      </Routes>
    </Router>
  );
}

export default App;
