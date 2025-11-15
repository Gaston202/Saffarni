import heroImg from "../assets/heroimgg.svg";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto flex items-center gap-16 py-20">
      <div className="flex-1 space-y-6">
        <h2 className="text-[#DF6951] font-semibold text-lg tracking-wide uppercase">
          Best Destinations Around the World
        </h2>
        <h1 className="text-[#255194] font-bold leading-tight">
          <span className="text-7xl block">Your dream</span>
          <span className="text-7xl block">
            trip, designed
            <span className="relative inline-block ml-4">
              <span className="relative z-10">by</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 120 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 12C20 8, 40 6, 60 8C80 10, 100 12, 118 10"
                  stroke="#DF6951"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
          <span className="text-7xl block">AI.</span>
        </h1>
        <p className="text-[#5E6282] text-lg leading-relaxed max-w-xl">
          Explore the world with Saffarni, your AI-powered travel planner.
          Discover personalized destinations, itineraries, and exclusive deals
          tailored just for you.
        </p>
        <Button
          asChild
          variant="default"
          size="lg"
          className="bg-[#DF6951] text-white hover:bg-[#c85a48] shadow-lg hover:shadow-xl transition-all"
        >
          <Link to="/destinations">Plan Your Trip</Link>
        </Button>
      </div>
      <div className="flex-1 flex justify-end">
        <img
          src={heroImg}
          alt="Travel destination"
          className="max-w-full h-auto drop-shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Hero;
