import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from './Theme'

const PageProvider = ({ children }) => {
  const { resolvedTheme } = useState();
  const [currentTheme, setCurrentTheme] = useState(darkTheme)

  useEffect(() => {
    resolvedTheme === 'light' ? setCurrentTheme(lightTheme) : setCurrentTheme(darkTheme)
    return () => { }
  }, [resolvedTheme, currentTheme])


  return <ThemeProvider theme={currentTheme}>
    {children}
  </ThemeProvider>
}

export default PageProvider