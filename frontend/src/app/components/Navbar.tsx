"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const categories = [
  { name: "Electronics", subcategories: ["Mobiles", "Laptops", "Cameras"] },
  {
    name: "Fashion",
    subcategories: ["Men's Clothing", "Women's Clothing", "Shoes"],
  },
  { name: "Home & Furniture", subcategories: ["Sofas", "Beds", "Decor"] },
  {
    name: "Beauty & Personal Care",
    subcategories: ["Makeup", "Skincare", "Haircare"],
  },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    categoryName: string
  ) => {
    setAnchorEl(event.currentTarget);
    setHoveredCategory(categoryName);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setHoveredCategory(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#1976D2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
          My E-Commerce
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {categories.map((category) => (
            <Box
              key={category.name}
              onMouseOver={(event) => handleMenuOpen(event, category.name)}
              onMouseOut={handleMenuClose}
              sx={{
                display: "flex",
                flexDirection: "row",
                position: "relative",
                cursor: "pointer",
                color: "white",
                fontWeight: "bold",
              }}
            >
              <div style={{ cursor: "pointer"}}>{category.name}</div>
              <div>
                <Box
                  sx={{
                    display: "inline-flex", // Ensures it stays in place
                    alignItems: "center",
                    transition: "transform 0.3s ease-in-out",
                    transform:
                      hoveredCategory === category.name
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
                >
                  <KeyboardArrowDownIcon />
                </Box>
              </div>

              {/* Subcategories on Hover */}

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && hoveredCategory === category.name}
                onClose={handleMenuClose}
                disableAutoFocusItem
                disableRestoreFocus
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                sx={{ mt: 1 }}
              >
                {category.subcategories.map((sub) => (
                  <MenuItem key={sub} onClick={handleMenuClose}>
                    {sub}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
