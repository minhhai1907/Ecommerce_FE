import React from "react";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./routes";
import ThemeProvider from "./theme/index";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop />
        <Router/>
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>
  )
}

export default App


