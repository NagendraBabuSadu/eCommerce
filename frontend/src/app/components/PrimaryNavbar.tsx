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
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

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
  const [userLogged, setUserLogged] = useState<boolean>(false);

  const theme = useTheme();
  const router = useRouter();

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    if (router) {
      router.push("/auth/login");
      setUserLogged(true);
    } else {
      return <p>Loading....</p>;
    }
  };

  const handleLogoutClick = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("No auth token found.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Logout successful!");
        console.log("Logout successful");
        router.push("/auth/logout");

        // Clear local storage
        localStorage.clear();
        setUserLogged(false);
        // Navigate to home or login page
        setTimeout(() => {
          router.push("/");
        }, 4000);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "#2874f0",
        boxShadow: "none",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 9999,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href={"/"} style={{ fontWeight: "bold" }}>
          BuyNest
        </Link>

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
          {!userLogged ? (
            <Button
              variant="contained"
              sx={{ bgcolor: "#fff", color: "#2874f0" }}
              onClick={handleLoginClick}
            >
              Login
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ bgcolor: "#fff", color: "#2874f0" }}
              onClick={handleLogoutClick}
            >
              Logout
            </Button>
          )}
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
