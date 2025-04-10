"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThemeToggleButton from "./ThemeToggle";

const SearchBox = styled("div")(({ theme }) => ({
  backgroundColor: "#f0f0f0",
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  padding: "0 10px",
  marginLeft: theme.spacing(2),
  flexGrow: 1,
}));

const PrimaryNavbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        background: "#2874f0",
        boxShadow: "none",
        position: "fixed",
        top: 0,
        width: "100%", // ✅ important for full-width
        zIndex: 9999,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          BuyNest
        </Typography>

        {/* Search */}
        <SearchBox
          sx={{
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder="Search for products, brands and more"
            sx={{
              ml: 1,
              flex: 1,
            }}
          />
        </SearchBox>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: "space-around",
            paddingRight: "100px",
          }}
        >
          <Button
            variant="contained"
            sx={{ bgcolor: "#fff", color: "#2874f0" }}
            onClick={() => alert("Hi")}
          >
            Login
          </Button>
          <Typography variant="body2" sx={{ cursor: "pointer" }}>
            Become a Seller
          </Typography>
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleMoreClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Customer Care</MenuItem>
            <MenuItem onClick={handleClose}>Advertise</MenuItem>
          </Menu>
        </Box>
        <Box>
          <ThemeToggleButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryNavbar;
