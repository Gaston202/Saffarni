import heroImg from "../assets/heroimg.png";

const HomePage = () => {
  return (
    <div
      className="min-h-screen px-16"
      style={{ backgroundColor: "rgba(248,195,182,0.6)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center gap-16">
        <div className="flex-1">
          <h2 className="text-[#DF6951] font-semibold">
            BEST DESTINATIONS AROUND THE WORLD
          </h2>
          <h1 className="text-[#255194] font-bold leading-tight">
            <span className="text-7xl block mb-2">Your dream</span>
            <span className="text-7xl block mb-2">
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
        </div>
        <div className="flex-1 flex justify-end">
          <img
            src={heroImg}
            alt="Travel destination"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
