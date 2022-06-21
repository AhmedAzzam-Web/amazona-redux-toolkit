import { createTheme, css } from "@mui/material/styles";

export const coreTheme = {
  typography: {
    h1: {
      fontSize: "1.6rem",
      fontWeight: "400",
      margin: "1rem 0",
    },
    h2: {
      fontSize: "1.4rem",
      fontWeight: "400",
      margin: "1rem 0",
    },
  },
  palette: {
    primary: {
      main: "#f0c000",
    },
    secondary: {
      main: "#208080",
    },
  },
};

export const ligthTheme = createTheme({
  ...coreTheme,
  palette: {
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    background: {
      default: '#fff',
      paper: '#fff',
      card: '#fff',
    },
    ...coreTheme.palette,
    mode: 'light',
  }
})

export const darkTheme = createTheme({
  ...coreTheme,
  palette: {
    ...coreTheme.palette,
    mode: 'dark',
  }
})

export const globalStyles = css`
  :root {
    body {
      background-color: #fff;
      color: #121212;
    }
  }
  [data-theme="dark"] {
    body {
      background-color: #121212;
      color: #fff;
    }
  }
`;