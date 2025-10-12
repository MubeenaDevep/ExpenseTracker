// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../api";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";
// import IconButton from "@mui/material/IconButton";
// import InputAdornment from "@mui/material/InputAdornment";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

// const Login = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [touched, setTouched] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); // 👁️ toggle state

//   // Snackbar states
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success", // success | error | warning | info
//   });

//   const handleSnackbarClose = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent page reload

//     const userData = {
//       username: username,
//       password: password,
//     };

//     try {
//       const data = await loginUser(userData); // Call API

//       if (data.access) {
//         // ✅ Save tokens
//         localStorage.setItem("access", data.access);
//         localStorage.setItem("refresh", data.refresh);

//         setSnackbar({
//           open: true,
//           message: "Login successful!",
//           severity: "success",
//         });

//         setTimeout(() => navigate("/home"), 1500); // Redirect after 1.5s
//       } else {
//         setSnackbar({
//           open: true,
//           message: "Login failed: access token missing.",
//           severity: "error",
//         });
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setSnackbar({
//         open: true,
//         message: "Login failed. Check username/password.",
//         severity: "error",
//       });
//     }
//   };

//   const isDisabled = !(username.trim() && password.trim());

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4"
//       style={{
//         backgroundImage: "url('/llog.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="w-full max-w-md bg-[#6a5fea] bg-opacity-100 rounded-2xl shadow-lg p-8">
//         <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
//         <form className="space-y-5" onSubmit={handleLogin}>
//           {/* Username */}
//           <div>
//             <label className="block text-white mb-1">Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               onBlur={() => setTouched(true)}
//               className="w-full px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
//               placeholder="Enter your username"
//             />
//             {touched && !username.trim() && (
//               <span className="text-red-500 text-sm">Username is required</span>
//             )}
//           </div>

//           {/* Password with visibility toggle */}
//           <div>
//             <label className="block text-white mb-1">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 onBlur={() => setTouched(true)}
//                 className="w-full px-4 py-2 pr-10 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 placeholder="Enter your password"
//               />
//               <IconButton
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="!absolute right-2 top-1/2 -translate-y-1/2"
//                 size="small"
//               >
//                 {showPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </div>
//             {touched && !password.trim() && (
//               <span className="text-red-500 text-sm">Password is required</span>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isDisabled}
//             className="w-full bg-[#ffc300] hover:bg-[#f3d460] text-black font-semibold py-2 rounded-lg transition"
//           >
//             Login
//           </button>
//         </form>

//         <div className="flex flex-col items-center mt-6 space-y-2">
//           <span className="text-sm">
//             Do not have an account?{" "}
//             <Link to="/register" className="text-white hover:underline">
//               Register now
//             </Link>
//           </span>
//         </div>
//       </div>

//       {/* ✅ Snackbar Component */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <MuiAlert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           variant="filled"
//           elevation={6}
//         >
//           {snackbar.message}
//         </MuiAlert>
//       </Snackbar>
//     </div>
//   );
// };

// export default Login;





import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { username, password };

    try {
      const data = await loginUser(userData);

      if (data.access) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);

        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });

        setTimeout(() => navigate("/home"), 1500);
      } else {
        setSnackbar({
          open: true,
          message: "Login failed: access token missing.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setSnackbar({
        open: true,
        message: "Login failed. Check username/password.",
        severity: "error",
      });
    }
  };

  const isDisabled = !(username.trim() && password.trim());

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 font-serif"
      style={{
        backgroundImage: "url('/login01.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Soft overlay for readability */}
      <div/>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-[#f9f3e7] border border-[#c9b79c] rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-center text-[#5c4a32] mb-6">
          Login
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Username */}
          <div>
            <label className="block text-[#5c4a32] mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched(true)}
              className="w-full px-4 py-2 rounded-lg bg-[#fdf6e3] border border-[#c9b79c] focus:outline-none focus:ring-2 focus:ring-[#c9b79c]"
              placeholder="Enter your username"
            />
            {touched && !username.trim() && (
              <span className="text-red-500 text-sm">Username is required</span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#5c4a32] mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched(true)}
                className="w-full px-4 py-2 pr-10 rounded-lg bg-[#fdf6e3] border border-[#c9b79c] focus:outline-none focus:ring-2 focus:ring-[#c9b79c]"
                placeholder="Enter your password"
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                className="!absolute right-2 top-1/2 -translate-y-1/2"
                size="small"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            {touched && !password.trim() && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isDisabled}
            className="w-full bg-[#c9b79c] hover:bg-[#b6a486] text-[#5c4a32] font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="flex flex-col items-center mt-6 space-y-2">
          <span className="text-sm text-[#5c4a32]">
            Don’t have an account?{" "}
            <Link to="/register" className="text-[#6a5fea] hover:underline">
              Register now
            </Link>
          </span>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          elevation={6}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Login;
