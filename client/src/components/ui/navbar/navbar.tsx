import React, { useState } from "react";
import { Home, CarTaxiFront, Bus, Car, Truck, LogOut } from "lucide-react";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navItems = [
    { icon: Home, label: "Caminar", color: "bg-green-500" },
    { icon: CarTaxiFront, label: "Taxi", color: "bg-yellow-500" },
    { icon: Bus, label: "Micro", color: "bg-blue-500" },
    { icon: Car, label: "Auto propio", color: "bg-red-500" },
    { icon: Truck, label: "Trufi", color: "bg-purple-500" },
  ];

  return (
    <div className="flex z-20 h-screen antialiased text-gray-900 w-[500px] dark:bg-dark dark:text-light">
      <div
        className={`fixed inset-y-0 z-10 flex w-80 transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <svg
          className="absolute inset-0 w-full h-full text-white"
          style={{ filter: "drop-shadow(10px 0 10px #00000030)" }}
          preserveAspectRatio="none"
          viewBox="0 0 309 800"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z" />
        </svg>

        <div className="z-10 flex flex-col w-52 flex-1">
          <div className="flex items-center justify-between flex-shrink-0 w-64 p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-lg focus:outline-none focus:ring"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Close sidebar</span>
            </button>
          </div>

          <nav className="flex flex-col p-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex w-[250px] items-center space-x-4 py-3 px-2 rounded-lg mb-2 transition-all duration-200 ease-in-out ${item.color} bg-opacity-20 hover:bg-opacity-30 group`}
              >
                <item.icon className={`w-6 h-6 ${item.color.replace('bg-', 'text-')} group-hover:text-opacity-80`} />
                <span className={`text-sm font-medium ${item.color.replace('bg-', 'text-')} group-hover:text-opacity-80`}>
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex-shrink-0 p-4">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
              <LogOut className="w-6 h-6" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex flex-col items-center justify-center flex-1">
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed p-2 text-white bg-black rounded-lg top-5 left-5"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="sr-only">Open menu</span>
        </button>
      </main>
    </div>
  );
};

export default Navbar;