import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear token or user data from localStorage/sessionStorage
    localStorage.removeItem("token");

    // ✅ Show Snackbar
    setSnackbarOpen(true);

    // ✅ Redirect after small delay (so user sees Snackbar first)
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <nav className="bg-[#c9b79c] text-[#3e2723] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo / Title */}
          <Link to="/" className="text-2xl font-bold">
            ExpenseTracker
          </Link>

          {/* Hamburger menu icon for small screens */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Menu links (hidden on small screens) */}
          <ul className="hidden md:flex space-x-6 font-semibold items-center">
            <li><Link to="/home" className="hover:text-[#f9f3e7]">Home</Link></li>
            <li><Link to="/about" className="hover:text-[#f9f3e7]">About</Link></li>
            <li><Link to="/add-expenses" className="hover:text-[#f9f3e7]">Add Expenses</Link></li>
            <li><Link to="/add-budget" className="hover:text-[#f9f3e7]">Add Budget</Link></li>
            <li><Link to="/add-income" className="hover:text-[#f9f3e7]">Add Income</Link></li>
            <li><Link to="/statistics" className="hover:text-[#f9f3e7]">Statistics</Link></li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-semibold"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <ul className="md:hidden flex flex-col items-center space-y-4 pb-4 font-semibold">
            <li><Link to="/home" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/add-expenses" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Add Expenses</Link></li>
            <li><Link to="/add-budget" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Add Budget</Link></li> 
            <li><Link to="/add-income" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>add Income</Link></li>
            <li><Link to="/statistics" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Statistics</Link></li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-semibold"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>

      {/* ✅ Snackbar for logout */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
          variant="filled"
        >
          Logged out successfully!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Navbar;





