import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Routes/SignUp";
import Login from "./Routes/Login";
import HomePage from "./Routes/HomePage";
import RecommendationPage from "./Routes/RecommendationPage";
import TripCustomizationPage from "./Routes/TripCustomizationPage";

import HotelsPage from "./Routes/HotelsPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Experiences from "./Routes/Experience";
import Profile from "./Routes/Profile";
import PrivateRoute from "./Routes/PrivateRoute";
import Admin from "./Routes/Admin";
import AdminGuard from "./components/admin/AdminGuard";
import AuthProvider from "@/context/AuthProvider";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />

          <Route
            path="/destinations"
            element={
              <PrivateRoute>
                <RecommendationPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/customize/:destinationId"
            element={
              <PrivateRoute>
                <TripCustomizationPage />
              </PrivateRoute>
            }
          />

         
          <Route
            path="/hotels"
            element={
              <PrivateRoute>
                <HotelsPage />
              </PrivateRoute>
            }
          />

          <Route path="/experiences" element={<Experiences />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

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
    </AuthProvider>
  );
}

export default App;
