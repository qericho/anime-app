import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Clapperboard, Film, Tv } from "lucide-react";

const links = [
  { name: "Latest", path: "/latest", icon: <Clapperboard size={18} /> },
  { name: "Anime", path: "/anime", icon: <Tv size={18} /> },
  { name: "Movie", path: "/movie", icon: <Film size={18} /> },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <NavLink
          to="/"
          className="cursor-pointer text-2xl font-bold text-blue-600 tracking-wide"
        >
          Ani<span className="text-gray-800">App</span>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-x-8 text-gray-700 font-medium">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "hover:text-blue-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-700 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar (Right) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={26} className="text-gray-700 cursor-pointer " />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="flex flex-col gap-y-2 px-4 py-6 text-gray-700 font-medium">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "hover:bg-gray-100 hover:text-blue-600"
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Nav;
