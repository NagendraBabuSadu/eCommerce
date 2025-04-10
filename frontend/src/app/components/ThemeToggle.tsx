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
        top: 12,
        right: 2,
        zIndex: 9999,
        alignItems: "center"
      }}
    >
      <Tooltip
        title="Toggle light/dark" className="theme justify-right"
        >
        <IconButton onClick={toggleColorMode} color="inherit">
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
