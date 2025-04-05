// app/theme.ts
import { PaletteMode } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#1976d2" },
          background: { default: "#f5f5f5" },
        }
      : {
          primary: { main: "#90caf9" },
          background: { default: "#121212" },
        }),
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default getDesignTokens;
