import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import SaffarniLogo from "../assets/SaffarniLogo.png";

const Footer = () => {
  return (
    <footer
      className="w-full text-black"
      style={{ backgroundColor: "#FFF1DA" }}
    >
      <div className="w-full px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-3xl font-bold" style={{ color: "#DF6951" }}>
                Saffarni
              </h2>
              <img src={SaffarniLogo} alt="Saffarni Logo" className="h-20" />
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Your AI-powered travel companion. Plan, customize, and book your
              perfect journey with intelligent recommendations.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#255194]/10 hover:bg-[#DF6951] hover:text-white flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#255194]/10 hover:bg-[#DF6951] hover:text-white flex items-center justify-center transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#255194]/10 hover:bg-[#DF6951] hover:text-white flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#255194]/10 hover:bg-[#DF6951] hover:text-white flex items-center justify-center transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "#DF6951" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-[#DF6951] transition-colors duration-300 text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-[#DF6951] transition-colors duration-300 text-sm"
                >
                  Destinations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-[#DF6951] transition-colors duration-300 text-sm"
                >
                  Hotels
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-[#DF6951] transition-colors duration-300 text-sm"
                >
                  My Bookings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-[#DF6951] transition-colors duration-300 text-sm"
                >
                  Trip Planner
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "#DF6951" }}
            >
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-[#DF6951] transition-colors duration-300 text-sm"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-[#DF6951] transition-colors duration-300 text-sm"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-[#DF6951] transition-colors duration-300 text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-[#DF6951] transition-colors duration-300 text-sm"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-[#DF6951] transition-colors duration-300 text-sm"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "#DF6951" }}
            >
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin
                  className="w-5 h-5 mt-1 flex-shrink-0"
                  style={{ color: "#DF6951" }}
                />
                <span className="text-gray-700 text-sm">
                  123 Travel Street, Adventure City, TC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "#DF6951" }}
                />
                <a
                  href="tel:+1234567890"
                  className="text-gray-700 hover:text-[#DF6951] transition-colors duration-300 text-sm"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "#DF6951" }}
                />
                <a
                  href="mailto:info@saffarni.com"
                  className="text-gray-700 hover:text-[#DF6951] transition-colors duration-300 text-sm"
                >
                  info@saffarni.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Saffarni. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-600 hover:text-[#DF6951] transition-colors duration-300 text-sm"
              >
                Cookies Policy
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[#DF6951] transition-colors duration-300 text-sm"
              >
                Sitemap
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[#DF6951] transition-colors duration-300 text-sm"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
