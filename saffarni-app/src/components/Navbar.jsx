"use client";

import { MenuIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SaffarniLogo from "../assets/SaffarniLogo.png";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/utils/UserRole"; // 👈 IMPORT AUTH

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth(); // 👈 GET auth state

  return (
    <section
      className="py-4 sticky top-0 z-50 rounded-lg"
      style={{ backgroundColor: "#FFF1DA" }}
    >
      <div className="container">
        <nav className="flex items-center justify-around lg:justify-between">
          
          {/* LOGO */}
          <Link to="/">
            <img
              src={SaffarniLogo}
              className="max-h-20 ml-12"
              alt="Saffarni Logo"
              style={{ cursor: "pointer" }}
            />
          </Link>

          {/* NAV LINKS */}
          <div className="hidden lg:flex items-center gap-8">
            <Button variant="link" className="text-black" asChild>
              <Link to="/destinations">Destinations</Link>
            </Button>
            <Button variant="link" className="text-black" asChild>
              <Link to="/bookings">Bookings</Link>
            </Button>
            <Button variant="link" className="text-black" asChild>
              <Link to="/hotels">Hotels</Link>
            </Button>
            <Button variant="link" className="text-black" asChild>
              <Link to="/Experiences">Activities</Link>
            </Button>
          </div>

          {/* RIGHT SECTION → dynamic buttons */}
          <div className="hidden items-center gap-4 lg:flex">
            
            {/* IF NOT LOGGED IN */}
            {!isAuthenticated && (
              <>
                <Button variant="link" className="text-black" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button variant="link" className="text-[#DF6951]" asChild>
                  <Link to="/signup">Start for free</Link>
                </Button>
              </>
            )}

            {/* IF LOGGED IN */}
            {isAuthenticated && (
              <>
                <Button
                  variant="link"
                  className="text-black"
                  onClick={() => navigate("/profile")}
                >
                  {user?.userName || "Profile"}
                </Button>

                <Button
                  variant="link"
                  className="text-red-500"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
