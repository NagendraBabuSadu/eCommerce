"use client";
import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const categories = [
  { name: "Electronics", subcategories: ["Mobiles", "Laptops", "Cameras"] },
  { name: "Fashion", subcategories: ["Men", "Women", "Kids"] },
  { name: "Home", subcategories: ["Furniture", "Decor", "Appliances"] },
];

const DesktopView = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && !target.closest(".dropdown-container")) {
        setHoveredCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="hidden sm:flex gap-6 text-white font-bold">
      {categories.map((category) => (
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
                hoveredCategory === category.name ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {hoveredCategory === category.name && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-white text-black shadow-md rounded-md z-10">
              {category.subcategories.map((sub) => (
                <form key={sub}>
                  <input type="hidden" name="category" value={sub.toLowerCase()} />
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
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
    </div>
  );
};

export default DesktopView;
