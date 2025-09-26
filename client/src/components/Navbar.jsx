import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl text-blue-600 flex items-center gap-2 font-extrabold pacifico-regular hover:text-red-400 cursor-pointer rounded-sm">
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
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors  whitespace-nowrap cursor-pointer text-blue-600 bg-blue-50 hover:bg-gray-50"
              to="/"
            >
              Explore Events
            </Link>
            <Link
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              to="/create"
            >
              Create Event
            </Link>
          </div>
          <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors cursor-pointer">
            <i className="text-xl ri-menu-line"></i>
          </button>
        </div>
        
      </div>
    </nav>
  );
}
