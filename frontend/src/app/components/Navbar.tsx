"use client";
import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";


const categories = [
  { name: "Electronics", subcategories: ["Mobiles", "Laptops", "Cameras"] },
  { name: "Fashion", subcategories: ["Men", "Women", "Kids"] },
  { name: "Home", subcategories: ["Furniture", "Decor", "Appliances"] },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target?.closest(".dropdown-container")) {
        setHoveredCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-blue-600">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 flex justify-between items-center">
        {/* Logo / Brand */}
        <h1 className="text-white text-lg sm:text-xl font-bold">
          My E-Commerce
        </h1>

        {/* Hamburger Menu Button for Mobile */}
        <button
          className="text-white sm:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <CloseIcon fontSize="large" />
          ) : (
            <MenuIcon fontSize="large" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex gap-6 text-white font-bold">
          {categories?.map((category) => (
            <div
              key={category.name}
              className="relative cursor-pointer dropdown-container"
              onClick={() =>
                setHoveredCategory(
                  hoveredCategory === category.name ? null : category.name
                )
              }
            >
              <div className="flex items-center gap-1">
                {category.name}
                <KeyboardArrowDownIcon
                  className={`transition-transform duration-300 ${
                    hoveredCategory === category.name
                      ? "rotate-180"
                      : "rotate-0"
                  }`}
                />
              </div>

              {/* Dropdown Menu */}
              {hoveredCategory === category.name && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white text-black shadow-md rounded-md z-10">
                  
                  {category.subcategories?.map((sub) => (
                    <form key={sub} >
                      <input
                        type="hidden"
                        name="category"
                        value={sub.toLowerCase()}
                      />
                      <button
                        type="submit"
                        className="block w-full h-full px-4 py-2 hover:bg-gray-200 text-left"
                        onClick={() => setHoveredCategory(null)}
                      >
                        {sub}
                      </button>
                    </form>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-blue-600 p-5 flex flex-col sm:hidden z-50">
            {categories?.map((category) => (
              <details key={category.name} className="mb-3">
                <summary className="flex justify-between items-center text-white font-bold cursor-pointer">
                  {category.name}
                  <KeyboardArrowDownIcon />
                </summary>
                <div className="ml-4 mt-2 text-gray-200">
               
                  {category.subcategories?.map((sub) => (
                    <form key={sub}>
                      <input
                        type="hidden"
                        name="category"
                        value={sub.toLowerCase()}
                      />
                      <button
                        type="submit"
                        className="block w-full h-full px-4 py-2 hover:bg-gray-200 text-left"
                        onClick={() => setHoveredCategory(null)}
                      >
                        {sub}
                      </button>
                    </form>
                  ))}
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
