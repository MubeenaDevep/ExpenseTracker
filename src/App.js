import React, { useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, IconButton } from '@mui/material';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import './App.css';

import Login from "./components/login";
import Register from "./components/register";
import Header from './components/header';
import Footer from './components/footer';
import About from './pages/about';
import Home from './pages/home';
import AddExpensePage from './pages/AddExpensePage';
import AddBudgetPage from './pages/AddBudgetPage';
import AddIncomePage from './pages/AddIncomePage';
import Statistics from './pages/statistics';
import Chatbot from './components/Chatbot'; // ✅ Import Chatbot component

function Layout({ children }) {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/register", "/"].includes(location.pathname);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        action={(snackbarId) => (
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => closeSnackbar(snackbarId)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      >
        {!hideHeaderFooter && <Header />}
        <div className="p-4 min-h-screen flex flex-col justify-between">
          {children}
        </div>
        {!hideHeaderFooter && <Footer />}

       {/* ✅ Chatbot visible on all pages except login/register */}
        {!["/login", "/register"].includes(location.pathname) && (
          <Chatbot initialOpen={false} />
        )}
      </SnackbarProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-expenses" element={<AddExpensePage />} />
        <Route path="/add-budget" element={<AddBudgetPage />} />
        <Route path="/add-income" element={<AddIncomePage />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;
