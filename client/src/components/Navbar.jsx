export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl text-blue-600 flex items-center gap-2 font-extrabold pacifico-regular hover:text-red-400 hover:bg-gray-100 cursor-pointer rounded-sm"
          onClick={()=>{
            navigate("/")
          }}
          >
            <i className="text-4xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                />
              </svg>
            </i>
            <span className="pacifico-regular">GoLocal</span>
          </h1>
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form className="w-full">
              {/* <div className="relative text-black">
                <input
                  placeholder="Search events, hosts, or locations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  type="text"
                  defaultValue=""
                />
                <i className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black">
                  <svg
                    className="w-6 h-6 text-gray-800 text-black"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </i>
              </div> */}
            </form>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors  whitespace-nowrap cursor-pointer text-blue-600 bg-blue-50 hover:bg-gray-50"
              href="/events"
            >
              Explore Events
            </a>
            <a
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              href="/create"
            >
              Create Event
            </a>
          </div>
          <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors cursor-pointer">
            <i className="text-xl ri-menu-line"></i>
          </button>
        </div>
        
      </div>
    </nav>
  );
}
