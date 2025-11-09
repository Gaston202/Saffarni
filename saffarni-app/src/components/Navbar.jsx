"use client";

import { MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SaffarniLogo from "../assets/SaffarniLogo.png";

import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <section
      className="py-4 sticky top-0 z-50 rounded-lg"
      style={{ backgroundColor: "#FFF1DA" }}
    >
      <div className="container">
        <nav className="flex items-center justify-around lg:justify-between">
          <Link to="/">
            <img
              src={SaffarniLogo}
              className="max-h-20 ml-12"
              alt="Saffarni Logo"
              style={{ cursor: "pointer" }}
            />
          </Link>

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
          </div>
          <div className="hidden items-center gap-4 lg:flex">
            <Button variant="link" className="text-black">
              Sign in
            </Button>
            <Button variant="link" className="text-[#DF6951]">
              Start for free
            </Button>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
