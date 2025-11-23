import { MenuIcon, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SaffarniLogo from "../assets/SaffarniLogo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Destinations", path: "/destinations" },
    { name: "Hotels", path: "/hotels" },
    { name: "Activities", path: "/experiences" },
  ];

  return (
    <section
      className="py-3 sticky top-0 z-50 backdrop-blur-sm shadow-sm"
      style={{ backgroundColor: "#FFF1DA" }}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={SaffarniLogo}
              className="h-16 w-auto"
              alt="Saffarni Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-base font-medium text-gray-700 hover:text-[#DF6951] transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#DF6951] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-[#DF6951] hover:bg-transparent font-medium"
              asChild
            >
              <Link to="/login">Sign in</Link>
            </Button>
            <Button
              className="bg-[#DF6951] hover:bg-[#c85a48] text-white font-medium px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              asChild
            >
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-gray-700">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px]"
              style={{ backgroundColor: "#FFF1DA" }}
            >
              <div className="flex flex-col gap-6 mt-8">
                {/* Mobile Logo */}
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <img
                    src={SaffarniLogo}
                    className="h-12 w-auto mb-6"
                    alt="Saffarni Logo"
                  />
                </Link>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-gray-700 hover:text-[#DF6951] transition-colors duration-200 py-2 border-b border-gray-200"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col gap-3 mt-6">
                  <Button
                    variant="outline"
                    className="w-full border-[#DF6951] text-[#DF6951] hover:bg-[#DF6951] hover:text-white font-medium"
                    asChild
                  >
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      Sign in
                    </Link>
                  </Button>
                  <Button
                    className="w-full bg-[#DF6951] hover:bg-[#c85a48] text-white font-medium"
                    asChild
                  >
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
