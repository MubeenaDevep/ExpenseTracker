// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "../api";
// import { Snackbar, Alert } from "@mui/material";

// const MAX_LEN = 15;

// const Register = () => {
//   const navigate = useNavigate();

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [username, setUsername] = useState("");
//   const [gender, setGender] = useState("");
//   const [phoneNo, setPhoneNo] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [touched, setTouched] = useState(false);

//   // 👁 password visibility
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   // ✅ Snackbar state
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   // Helper: flatten DRF-style errors {field: [msg]}
//   const flattenErrors = (err) => {
//     if (!err) return "Unknown error";
//     if (typeof err === "string") return err;
//     if (err.detail) return err.detail;
//     if (err.message) return err.message;
//     try {
//       return Object.entries(err)
//         .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
//         .join("\n");
//     } catch {
//       return "Unknown error";
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setTouched(true);
//     console.log("✅ Register button clicked");

//     const valid =
//       firstName.trim() &&
//       lastName.trim() &&
//       username.trim() &&
//       gender.trim() &&
//       phoneNo.trim() &&
//       email.trim() &&
//       password.trim() &&
//       confirmPassword.trim() &&
//       password === confirmPassword;

//     if (!valid) {
//       console.warn("⚠️ Validation failed");
//       setSnackbar({
//         open: true,
//         message: "Please fill in all fields correctly",
//         severity: "error",
//       });
//       return;
//     }

//     const userData = {
//       first_name: firstName,
//       last_name: lastName,
//       username,
//       gender,
//       phone_no: phoneNo,
//       email,
//       password,
//       password2: confirmPassword,
//     };

//     try {
//       console.log("📤 Sending data:", userData);
//       await registerUser(userData);
//       console.log("✅ Registration successful");
//       setSnackbar({
//         open: true,
//         message: "Registration successful! 🎉",
//         severity: "success",
//       });
//       setTimeout(() => navigate("/home"), 1500); // small delay for UX
//     } catch (error) {
//       console.error("❌ Registration failed:", error);
//       setSnackbar({
//         open: true,
//         message: "Registration failed: " + flattenErrors(error),
//         severity: "error",
//       });
//     }
//   };

//   const isDisabled =
//     !firstName.trim() ||
//     !lastName.trim() ||
//     !username.trim() ||
//     !gender.trim() ||
//     !phoneNo.trim() ||
//     !email.trim() ||
//     !password.trim() ||
//     !confirmPassword.trim() ||
//     password !== confirmPassword;

//   return (
//     <div
//       className="min-h-screen flex items-center justify-start bg-gradient-to-br from-blue-50 to-blue-100 px-4"
//       style={{
//         backgroundImage: "url('/registerpage.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="w-full max-w-lg bg-white bg-opacity-60 rounded-2xl shadow-lg p-8">
//         <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
//           Register Now
//         </h2>

//         <form className="space-y-5" onSubmit={handleRegister}>
//           {/* First / Last */}
//           <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
//             <div className="flex-1">
//               <label className="block text-gray-700 mb-1">First Name</label>
//               <input
//                 type="text"
//                 value={firstName}
//                 maxLength={MAX_LEN}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className="w-full px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 placeholder="First name"
//                 autoComplete="given-name"
//               />
//               <div className="flex justify-between">
//                 {touched && !firstName.trim() && (
//                   <span className="text-red-500 text-sm">
//                     First name is required
//                   </span>
//                 )}
//                 <span className="text-xs text-gray-500">
//                   {firstName.length}/{MAX_LEN}
//                 </span>
//               </div>
//             </div>

//             <div className="flex-1">
//               <label className="block text-gray-700 mb-1">Last Name</label>
//               <input
//                 type="text"
//                 value={lastName}
//                 maxLength={MAX_LEN}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className="w-full px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 placeholder="Last name"
//                 autoComplete="family-name"
//               />
//               <div className="flex justify-between">
//                 {touched && !lastName.trim() && (
//                   <span className="text-red-500 text-sm">
//                     Last name is required
//                   </span>
//                 )}
//                 <span className="text-xs text-gray-500">
//                   {lastName.length}/{MAX_LEN}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Username */}
//           <div>
//             <label className="block text-gray-700 mb-1">Username</label>
//             <input
//               type="text"
//               value={username}
//               maxLength={MAX_LEN}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
//               placeholder="Username"
//               autoComplete="username"
//             />
//             <div className="flex justify-between">
//               {touched && !username.trim() && (
//                 <span className="text-red-500 text-sm">Username is required</span>
//               )}
//               <span className="text-xs text-gray-500">
//                 {username.length}/{MAX_LEN}
//               </span>
//             </div>
//           </div>

//           {/* Gender / Phone */}
//           <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
//             <div className="flex-1">
//               <label className="block text-gray-700 mb-1">Gender</label>
//               <select
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//                 className="w-full px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
//               >
//                 <option value="">Select gender</option>
//                 <option value="male">male</option>
//                 <option value="female">female</option>
//                 <option value="other">Other</option>
//               </select>
//               {touched && !gender.trim() && (
//                 <span className="text-red-500 text-sm">Gender is required</span>
//               )}
//             </div>

//             <div className="flex-1">
//               <label className="block text-gray-700 mb-1">Phone No</label>
//               <input
//                 type="tel"
//                 value={phoneNo}
//                 onChange={(e) => setPhoneNo(e.target.value)}
//                 className="w-full px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 placeholder="Phone number"
//                 autoComplete="tel"
//               />
//               {touched && !phoneNo.trim() && (
//                 <span className="text-red-500 text-sm">
//                   Phone number is required
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
//               placeholder="Email address"
//               autoComplete="email"
//             />
//             {touched && !email.trim() && (
//               <span className="text-red-500 text-sm">Email is required</span>
//             )}
//           </div>

//           {/* Password / Confirm with 👁 toggles */}
//           <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
//             <div className="flex-1">
//               <label className="block text-gray-700 mb-1">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   placeholder="Password"
//                   autoComplete="new-password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((s) => !s)}
//                   className="absolute right-3 top-2 text-sm text-blue-600"
//                 >
//                   {showPassword ? "🙈 Hide" : "👁 Show"}
//                 </button>
//               </div>
//               {touched && !password.trim() && (
//                 <span className="text-red-500 text-sm">Password is required</span>
//               )}
//             </div>

//             <div className="flex-1">
//               <label className="block text-gray-700 mb-1">Confirm Password</label>
//               <div className="relative">
//                 <input
//                   type={showConfirm ? "text" : "password"}
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="w-full px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   placeholder="Confirm password"
//                   autoComplete="new-password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirm((s) => !s)}
//                   className="absolute right-3 top-2 text-sm text-blue-600"
//                 >
//                   {showConfirm ? "🙈 Hide" : "👁 Show"}
//                 </button>
//               </div>
//               {touched && !confirmPassword.trim() && (
//                 <span className="text-red-500 text-sm">
//                   Confirm password is required
//                 </span>
//               )}
//               {touched &&
//                 password &&
//                 confirmPassword &&
//                 password !== confirmPassword && (
//                   <span className="text-red-500 text-sm">
//                     Passwords do not match
//                   </span>
//                 )}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isDisabled}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
//           >
//             Register Now
//           </button>
//         </form>

//         <div className="flex flex-col items-center mt-6 space-y-2">
//           <span className="text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-600 hover:underline">
//               Login
//             </Link>
//           </span>
//         </div>
//       </div>

//       {/* ✅ Snackbar for feedback */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={handleCloseSnackbar}
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default Register;




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { Snackbar, Alert } from "@mui/material";
import registerImage from "../assets/reg01.jpeg";

const MAX_LEN = 15;

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState(false);

  // 👁 password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ✅ Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Helper: flatten DRF-style errors {field: [msg]}
  const flattenErrors = (err) => {
    if (!err) return "Unknown error";
    if (typeof err === "string") return err;
    if (err.detail) return err.detail;
    if (err.message) return err.message;
    try {
      return Object.entries(err)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
        .join("\n");
    } catch {
      return "Unknown error";
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setTouched(true);

    const valid =
      firstName.trim() &&
      lastName.trim() &&
      username.trim() &&
      gender.trim() &&
      phoneNo.trim() &&
      email.trim() &&
      password.trim() &&
      confirmPassword.trim() &&
      password === confirmPassword;

    if (!valid) {
      setSnackbar({
        open: true,
        message: "Please fill in all fields correctly",
        severity: "error",
      });
      return;
    }

    const userData = {
      first_name: firstName,
      last_name: lastName,
      username,
      gender,
      phone_no: phoneNo,
      email,
      password,
      password2: confirmPassword,
    };

    try {
      await registerUser(userData);
      setSnackbar({
        open: true,
        message: "Registration successful! 🎉",
        severity: "success",
      });
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Registration failed: " + flattenErrors(error),
        severity: "error",
      });
    }
  };

  const isDisabled =
    !firstName.trim() ||
    !lastName.trim() ||
    !username.trim() ||
    !gender.trim() ||
    !phoneNo.trim() ||
    !email.trim() ||
    !password.trim() ||
    !confirmPassword.trim() ||
    password !== confirmPassword;

  return (
    <div
      className="min-h-screen flex items-center justify-center font-serif bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${registerImage})` }}
    >

      {/* Form card */}
      <div className="relative z-10 w-full max-w-lg bg-[#f9f3e7] border border-[#c9b79c] rounded-2xl h-50 shadow-lg p-8">
        <h2 className="text-2xl font-bold text-[#5c4a32] mb-6 text-center">
          Register Now
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleRegister}>
          {/* First / Last */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label className="block text-[#5c4a32] mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                maxLength={MAX_LEN}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#fdf6e3] border border-[#c9b79c] focus:outline-none focus:ring-2 focus:ring-[#c9b79c]"
                placeholder="First name"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[#5c4a32] mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                maxLength={MAX_LEN}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#fdf6e3] border border-[#c9b79c] focus:outline-none focus:ring-2 focus:ring-[#c9b79c]"
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-[#5c4a32] mb-1">Username</label>
            <input
              type="text"
              value={username}
              maxLength={MAX_LEN}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#fdf6e3] border border-[#c9b79c] focus:outline-none focus:ring-2 focus:ring-[#c9b79c]"
              placeholder="Username"
            />
          </div>

          {/* Gender / Phone */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label className="block text-[#5c4a32] mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#fdf6e3] border border-[#c9b79c] focus:outline-none focus:ring-2 focus:ring-[#c9b79c]"
              >
                <option value="">Select gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-[#5c4a32] mb-1">Phone No</label>
              <input
                type="tel"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#fdf6e3] border border-[#c9b79c] focus:outline-none focus:ring-2 focus:ring-[#c9b79c]"
                placeholder="Phone number"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#5c4a32] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#fdf6e3] border border-[#c9b79c] focus:outline-none focus:ring-2 focus:ring-[#c9b79c]"
              placeholder="Email address"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#5c4a32] mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#fdf6e3] border border-[#c9b79c] focus:outline-none focus:ring-2 focus:ring-[#c9b79c]"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="text-sm text-[#5c4a32] mt-1"
            >
              {showPassword ? "🙈 Hide" : "👁 Show"}
            </button>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[#5c4a32] mb-1">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#fdf6e3] border border-[#c9b79c] focus:outline-none focus:ring-2 focus:ring-[#c9b79c]"
              placeholder="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="text-sm text-[#5c4a32] mt-1"
            >
              {showConfirm ? "🙈 Hide" : "👁 Show"}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isDisabled}
            className="w-full bg-[#c9b79c] hover:bg-[#b09f87] text-black font-semibold py-2 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Register Now
          </button>
        </form>

        <div className="flex flex-col items-center mt-6 space-y-2">
          <span className="text-sm text-[#5c4a32]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#6a5fea] underline">
              Login
            </Link>
          </span>
        </div>
      </div>

      {/* ✅ Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
