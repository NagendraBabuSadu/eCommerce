"use client";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const categories = [
  { name: "Electronics", subcategories: ["Mobiles", "Laptops", "Cameras"] },
  { name: "Fashion", subcategories: ["Men", "Women", "Kids"] },
  { name: "Home", subcategories: ["Furniture", "Decor", "Appliances"] },
];

const MobileView = ({ onClose }: { onClose: () => void }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="sm:hidden mt-4 bg-white rounded-md shadow-md p-4 text-black space-y-4">
      {categories.map((category) => (
        <div key={category.name}>
          <div
            className="flex justify-between items-center font-semibold cursor-pointer"
            onClick={() =>
              setExpandedCategory(
                expandedCategory === category.name ? null : category.name
              )
            }
          >
            <span>{category.name}</span>
            <KeyboardArrowDownIcon
              className={`transition-transform duration-300 ${
                expandedCategory === category.name ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          {expandedCategory === category.name && (
            <div className="mt-2 pl-4 space-y-1 text-sm">
              {category.subcategories.map((sub) => (
                <form key={sub}>
                  <input type="hidden" name="category" value={sub.toLowerCase()} />
                  <button
                    type="submit"
                    className="block w-full text-left py-1 hover:text-blue-600"
                    onClick={() => {
                      onClose(); // Close menu after selecting
                      setExpandedCategory(null);
                    }}
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

export default MobileView;
