import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar({ children }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const userData = JSON.parse(localStorage.getItem("user"));
  const fullname = userData ? userData.fullname : "User";
  const userImage = userData
    ? userData.userImage
    : "https://via.placeholder.com/40";

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed z-20 inset-y-0 left-0 w-64 bg-gray-800 text-white transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 flex flex-col justify-between`}
      >
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center justify-center mb-6">
            <img
              src=".././public/icon.png"
              alt="Site Logo"
              className="w-12 h-12 mr-2"
            />
            <h1 className="text-2xl font-bold">Efficio</h1>
          </div>

          <nav className="flex-1">
            <Link
              to="/dashboard"
              className="block py-2 px-4 text-lg hover:bg-gray-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/projects"
              className="block py-2 px-4 text-lg hover:bg-gray-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="/tasks"
              className="block py-2 px-4 text-lg hover:bg-gray-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              Tasks
            </Link>
            <Link
              to="/users"
              className="block py-2 px-4 text-lg hover:bg-gray-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              Users
            </Link>
          </nav>
        </div>

        <div className="flex items-center p-4 bg-gray-700">
          <img
            src={userImage}
            alt={fullname}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <Link to="/profile">
              <p className="text-white text-lg font-semibold hover:text-gray-300">
                {fullname}
              </p>
            </Link>
          </div>
          <button
            className="ml-auto bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <div className="bg-gray-100 p-4">
          <button
            onClick={toggleSidebar}
            className="text-white bg-gray-800 p-2 rounded-md focus:outline-none md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isSidebarOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Sidebar;
