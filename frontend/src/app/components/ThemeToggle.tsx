// app/components/ThemeToggleButton.tsx
"use client";

import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useColorMode } from "./ThemeRegistry";

export default function ThemeToggleButton() {
  const { toggleColorMode, mode } = useColorMode();

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton onClick={toggleColorMode} color="inherit">
        {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
}
