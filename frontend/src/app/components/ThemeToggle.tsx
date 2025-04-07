// app/components/ThemeToggleButton.tsx
"use client";

import { Box, IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useColorMode } from "./ThemeRegistry";

export default function ThemeToggleButton() {
  const { toggleColorMode, mode } = useColorMode();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 10,
        right: 16,
        zIndex: 9999,
      }}
    >
      <Tooltip
        title="Toggle light/dark theme justify-right"
        sx={{ mt: "70px" }}
      >
        <IconButton onClick={toggleColorMode} color="inherit">
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
