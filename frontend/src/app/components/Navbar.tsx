"use client";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DesktopView from "./DesktopView";
import MobileView from "./MobileView";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className=" left-0 w-full bg-blue-600/80 p-4 backdrop-blur-md">
      <div className="flex justify-between items-center">
   
        <button
          className="text-white sm:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? (
            <CloseIcon fontSize="large" />
          ) : (
            <MenuIcon fontSize="large" />
          )}
        </button>

        <DesktopView />
      </div>

      {mobileMenuOpen && (
        <MobileView onClose={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
