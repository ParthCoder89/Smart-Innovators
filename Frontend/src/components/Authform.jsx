// import React, { useEffect, useState } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// export default function Authform({ type, onClose, onAuthSuccess }) {
//     const [email, setEmail] = useState("");
//     const [mobile, setMobile] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Normally you would call backend API here
//         const userData = { email, mobile };
//         onAuthSuccess(userData);
//     };

//     useEffect(() => {
//         AOS.init({ duration: 1000, once: false });
//     }, []);


//     return (
//         <div className="fixed inset-0 flex justify-end z-50" data-aos="fade-left">
//             {/* Overlay */}
//             <div
//                 className="absolute inset-0 bg-black opacity-50"
//                 onClick={onClose}
//             ></div>

//             {/* Sliding Panel */}
//             <div className="relative w-full max-w-md bg-white dark:bg-gray-900 shadow-lg p-8 transform translate-x-0 transition-transform duration-300">

//                 <button
//                     className="absolute top-4 right-4 text-4xl font-bold text-gray-600 hover:text-red-600"
//                     onClick={onClose}
//                 >
//                     ×
//                 </button>

//                 <h2 className="text-2xl font-bold mt-10 mb-6 text-center">
//                     {type === "signin" ? "Sign In" : "Sign Up"}
//                 </h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-gray-700 dark:text-gray-300">Email</label>
//                         <input
//                             type="email"
//                             className="w-full p-2 border rounded mt-1 text-black"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>

//                     {type === "signup" && (
//                         <div>
//                             <label className="block text-gray-700 dark:text-gray-300">Mobile Number</label>
//                             <input
//                                 type="text"
//                                 className="w-full p-2 border rounded mt-1 text-black"
//                                 value={mobile}
//                                 onChange={(e) => setMobile(e.target.value)}
//                                 required
//                             />
//                         </div>
//                     )}

//                     <div>
//                         <label className="block text-gray-700 dark:text-gray-300">Password</label>
//                         <input
//                             type="password"
//                             className="w-full p-2 border rounded mt-1 text-black"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-500"
//                     >
//                         {type === "signin" ? "Sign In" : "Sign Up"}
//                     </button>
//                     {/* <button className="fixed top-5 right-5">
//                         *
//                     </button> */}
//                 </form>
//             </div>
//         </div>
//     );
// }



// import React, { useEffect, useState } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// export default function Authfrom() {
//   const [flipped, setFlipped] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Login state
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   // Signup state
//   const [signupName, setSignupName] = useState("");
//   const [signupEmail, setSignupEmail] = useState("");
//   const [signupPassword, setSignupPassword] = useState("");
//   const [signupConfirm, setSignupConfirm] = useState("");

//   function toggleFlip() {
//     setFlipped((s) => !s);
//   }

//   async function handleLogin(e) {
//     e.preventDefault();
//     setLoading(true);
//     await new Promise((r) => setTimeout(r, 700));
//     setLoading(false);
//     alert(`Logging in ${loginEmail}`);
//   }

//   async function handleSignup(e) {
//     e.preventDefault();
//     if (signupPassword !== signupConfirm) {
//       alert("Passwords do not match");
//       return;
//     }
//     setLoading(true);
//     await new Promise((r) => setTimeout(r, 900));
//     setLoading(false);
//     alert(`Signing up ${signupEmail}`);
//   }

//   // Init AOS
//   useEffect(() => {
//     AOS.init({ duration: 1000, once: false });
//   }, []);

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 mt-20"
//       data-aos="fade-left"
//     >
//       <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//         {/* Left info panel */}
//         <div className="hidden md:flex flex-col gap-4 p-8 rounded-2xl bg-white/5 border border-white/5 shadow-2xl backdrop-blur-md">
//           <h2 className="text-3xl font-extrabold text-white">Welcome back 👋</h2>
//           <p className="text-slate-300">
//             Sign in to continue to your dashboard — or create a new account.
//             Smooth 3D flip animation and accessible forms included.
//           </p>
//           <div className="mt-auto">
//             <button
//               onClick={toggleFlip}
//               className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/20 transition"
//             >
//               {flipped ? "Go to Login" : "Create account"}
//             </button>
//           </div>
//         </div>

//         {/* Right 3D card */}
//         <div className="flex items-center justify-center">
//           <div className="relative" style={{ perspective: 1200 }}>
//             <div
//               className={`w-[360px] h-[520px] relative transition-transform duration-800 ease-in-out transform ${
//                 flipped ? "rotate-y-180" : "rotate-y-0"
//               }`}
//             >
//               {/* Front (Login) */}
//               <div className="absolute inset-0 rounded-2xl shadow-2xl backface-hidden">
//                 <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white/6 to-white/3 border border-white/5 p-6 flex flex-col justify-between">
//                   <div>
//                     <h3 className="text-2xl font-bold text-white">Sign in</h3>
//                     <p className="mt-2 text-sm text-slate-300">
//                       Enter your credentials to access your account.
//                     </p>

//                     <form
//                       onSubmit={handleLogin}
//                       className="mt-6 space-y-4"
//                       aria-label="Login form"
//                     >
//                       <label className="block">
//                         <span className="text-sm text-slate-300">Email</span>
//                         <input
//                           type="email"
//                           value={loginEmail}
//                           onChange={(e) => setLoginEmail(e.target.value)}
//                           required
//                           className="mt-1 w-full rounded-md px-3 py-2 bg-white/5 border border-white/6 placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         />
//                       </label>

//                       <label className="block">
//                         <span className="text-sm text-slate-300">Password</span>
//                         <input
//                           type="password"
//                           value={loginPassword}
//                           onChange={(e) => setLoginPassword(e.target.value)}
//                           required
//                           minLength={6}
//                           className="mt-1 w-full rounded-md px-3 py-2 bg-white/5 border border-white/6 placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         />
//                       </label>

//                       <div className="flex items-center justify-between text-sm">
//                         <label className="flex items-center gap-2 text-slate-300">
//                           <input
//                             type="checkbox"
//                             className="accent-indigo-500"
//                           />{" "}
//                           Remember me
//                         </label>
//                         <button
//                           type="button"
//                           className="text-indigo-300 hover:underline"
//                         >
//                           Forgot?
//                         </button>
//                       </div>

//                       <div className="pt-2">
//                         <button
//                           type="submit"
//                           disabled={loading}
//                           className="w-full rounded-lg py-2 bg-indigo-600 text-white font-semibold disabled:opacity-60"
//                         >
//                           {loading ? "Signing in..." : "Sign in"}
//                         </button>
//                       </div>
//                     </form>

//                     <div className="mt-4 flex items-center gap-3">
//                       <hr className="flex-1 border-white/6" />
//                       <span className="text-xs text-slate-300">or</span>
//                       <hr className="flex-1 border-white/6" />
//                     </div>

//                     <div className="mt-4 grid grid-cols-2 gap-3">
//                       <button className="py-2 rounded-lg border border-white/6 text-white/90">
//                         Continue with Google
//                       </button>
//                       <button className="py-2 rounded-lg border border-white/6 text-white/90">
//                         Continue with GitHub
//                       </button>
//                     </div>
//                   </div>

//                   <div className="text-sm text-slate-300 text-center">
//                     <span>Don't have an account?</span>
//                     <button
//                       onClick={toggleFlip}
//                       className="ml-2 text-indigo-300 font-semibold hover:underline"
//                     >
//                       Create one
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Back (Signup) */}
//               <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white/6 to-white/3 border border-white/5 p-6 transform rotate-y-180 backface-hidden">
//                 <div>
//                   <h3 className="text-2xl font-bold text-white">
//                     Create account
//                   </h3>
//                   <p className="mt-2 text-sm text-slate-300">
//                     Sign up to start your journey. It's quick and easy.
//                   </p>

//                   <form
//                     onSubmit={handleSignup}
//                     className="mt-6 space-y-4"
//                     aria-label="Signup form"
//                   >
//                     <label className="block">
//                       <span className="text-sm text-slate-300">Full name</span>
//                       <input
//                         type="text"
//                         value={signupName}
//                         onChange={(e) => setSignupName(e.target.value)}
//                         required
//                         className="mt-1 w-full rounded-md px-3 py-2 bg-white/5 border border-white/6 placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       />
//                     </label>

//                     <label className="block">
//                       <span className="text-sm text-slate-300">Email</span>
//                       <input
//                         type="email"
//                         value={signupEmail}
//                         onChange={(e) => setSignupEmail(e.target.value)}
//                         required
//                         className="mt-1 w-full rounded-md px-3 py-2 bg-white/5 border border-white/6 placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       />
//                     </label>

//                     <label className="block">
//                       <span className="text-sm text-slate-300">Password</span>
//                       <input
//                         type="password"
//                         value={signupPassword}
//                         onChange={(e) => setSignupPassword(e.target.value)}
//                         required
//                         minLength={6}
//                         className="mt-1 w-full rounded-md px-3 py-2 bg-white/5 border border-white/6 placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       />
//                     </label>

//                     <label className="block">
//                       <span className="text-sm text-slate-300">
//                         Confirm password
//                       </span>
//                       <input
//                         type="password"
//                         value={signupConfirm}
//                         onChange={(e) => setSignupConfirm(e.target.value)}
//                         required
//                         minLength={6}
//                         className="mt-1 w-full rounded-md px-3 py-2 bg-white/5 border border-white/6 placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       />
//                     </label>

//                     <div>
//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full rounded-lg py-2 bg-indigo-600 text-white font-semibold disabled:opacity-60"
//                       >
//                         {loading ? "Creating..." : "Create account"}
//                       </button>
//                     </div>
//                   </form>

//                   <div className="mt-4 text-sm text-slate-300 text-center">
//                     <span>Already have an account?</span>
//                     <button
//                       onClick={toggleFlip}
//                       className="ml-2 text-indigo-300 font-semibold hover:underline"
//                     >
//                       Sign in
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Styles for 3D */}
//       <style>{`
//         .rotate-y-0 { transform: rotateY(0deg); }
//         .rotate-y-180 { transform: rotateY(180deg); }
//         .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
//         .transition-transform { transform-style: preserve-3d; }
//         .relative > .absolute { transform-style: preserve-3d; }
//       `}</style>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// export default function Authform({ onAuthSuccess }) {
//   const [flipped, setFlipped] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Login state
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   // Signup state
//   const [signupName, setSignupName] = useState("");
//   const [signupEmail, setSignupEmail] = useState("");
//   const [signupMobile, setSignupMobile] = useState("");
//   const [signupPassword, setSignupPassword] = useState("");
//   const [signupConfirm, setSignupConfirm] = useState("");

//   function toggleFlip() {
//     setFlipped((s) => !s);
//   }

//   // ✅ Login backend call
//   async function handleLogin(e) {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: loginEmail,
//           password: loginPassword,
//         }),
//       });
//       const data = await res.json();
//       setLoading(false);

//       if (res.ok) {
//         alert("Login successful!");
//         onAuthSuccess(data); // parent me bhej do
//       } else {
//         alert(data.message || "Login failed");
//       }
//     } catch (err) {
//       setLoading(false);
//       alert("Error connecting to backend");
//       console.error(err);
//     }
//   }

//   // ✅ Signup backend call
//   async function handleSignup(e) {
//     e.preventDefault();
//     if (signupPassword !== signupConfirm) {
//       alert("Passwords do not match");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:3000/api/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: signupName,
//           email: signupEmail,
//           mobile: signupMobile,
//           password: signupPassword,
//         }),
//       });
//       const data = await res.json();
//       setLoading(false);

//       if (res.ok) {
//         alert("Signup successful!");
//         onAuthSuccess(data);
//       } else {
//         alert(data.message || "Signup failed");
//       }
//     } catch (err) {
//       setLoading(false);
//       alert("Error connecting to backend");
//       console.error(err);
//     }
//   }

//   // Init AOS
//   useEffect(() => {
//     AOS.init({ duration: 1000, once: false });
//   }, []);

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 mt-20"
//       data-aos="fade-left"
//     >
//       <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//         {/* Left info panel */}
//         <div className="hidden md:flex flex-col gap-4 p-8 rounded-2xl bg-white/5 border border-white/5 shadow-2xl backdrop-blur-md">
//           <h2 className="text-3xl font-extrabold text-white">Welcome back 👋</h2>
//           <p className="text-slate-300">
//             Sign in to continue to your dashboard — or create a new account.
//           </p>
//           <div className="mt-auto">
//             <button
//               onClick={toggleFlip}
//               className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/20 transition"
//             >
//               {flipped ? "Go to Login" : "Create account"}
//             </button>
//           </div>
//         </div>

//         {/* Right 3D card */}
//         <div className="flex items-center justify-center">
//           <div className="relative" style={{ perspective: 1200 }}>
//             <div
//               className={`w-[360px] h-[560px] relative transition-transform duration-800 ease-in-out transform ${
//                 flipped ? "rotate-y-180" : "rotate-y-0"
//               }`}
//             >
//               {/* Front (Login) */}
//               <div className="absolute inset-0 rounded-2xl shadow-2xl backface-hidden">
//                 <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white/6 to-white/3 border border-white/5 p-6 flex flex-col justify-between">
//                   <div>
//                     <h3 className="text-2xl font-bold text-white">Sign in</h3>
//                     <form
//                       onSubmit={handleLogin}
//                       className="mt-6 space-y-4"
//                       aria-label="Login form"
//                     >
//                       <input
//                         type="email"
//                         placeholder="Email"
//                         value={loginEmail}
//                         onChange={(e) => setLoginEmail(e.target.value)}
//                         required
//                         className="w-full rounded-md px-3 py-2 bg-white/5 border text-white"
//                       />
//                       <input
//                         type="password"
//                         placeholder="Password"
//                         value={loginPassword}
//                         onChange={(e) => setLoginPassword(e.target.value)}
//                         required
//                         className="w-full rounded-md px-3 py-2 bg-white/5 border text-white"
//                       />
//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full rounded-lg py-2 bg-indigo-600 text-white font-semibold disabled:opacity-60"
//                       >
//                         {loading ? "Signing in..." : "Sign in"}
//                       </button>
//                     </form>
//                   </div>
//                   <div className="text-sm text-slate-300 text-center">
//                     Don’t have an account?
//                     <button
//                       onClick={toggleFlip}
//                       className="ml-2 text-indigo-300 font-semibold hover:underline"
//                     >
//                       Create one
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Back (Signup) */}
//               <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white/6 to-white/3 border border-white/5 p-6 transform rotate-y-180 backface-hidden">
//                 <div>
//                   <h3 className="text-2xl font-bold text-white">Create account</h3>
//                   <form
//                     onSubmit={handleSignup}
//                     className="mt-6 space-y-4"
//                     aria-label="Signup form"
//                   >
//                     <input
//                       type="text"
//                       placeholder="Full Name"
//                       value={signupName}
//                       onChange={(e) => setSignupName(e.target.value)}
//                       required
//                       className="w-full rounded-md px-3 py-2 bg-white/5 border text-white"
//                     />
//                     <input
//                       type="email"
//                       placeholder="Email"
//                       value={signupEmail}
//                       onChange={(e) => setSignupEmail(e.target.value)}
//                       required
//                       className="w-full rounded-md px-3 py-2 bg-white/5 border text-white"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Mobile Number"
//                       value={signupMobile}
//                       onChange={(e) => setSignupMobile(e.target.value)}
//                       required
//                       className="w-full rounded-md px-3 py-2 bg-white/5 border text-white"
//                     />
//                     <input
//                       type="password"
//                       placeholder="Password"
//                       value={signupPassword}
//                       onChange={(e) => setSignupPassword(e.target.value)}
//                       required
//                       className="w-full rounded-md px-3 py-2 bg-white/5 border text-white"
//                     />
//                     <input
//                       type="password"
//                       placeholder="Confirm Password"
//                       value={signupConfirm}
//                       onChange={(e) => setSignupConfirm(e.target.value)}
//                       required
//                       className="w-full rounded-md px-3 py-2 bg-white/5 border text-white"
//                     />
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="w-full rounded-lg py-2 bg-indigo-600 text-white font-semibold disabled:opacity-60"
//                     >
//                       {loading ? "Creating..." : "Create account"}
//                     </button>
//                   </form>
//                   <div className="mt-4 text-sm text-slate-300 text-center">
//                     Already have an account?
//                     <button
//                       onClick={toggleFlip}
//                       className="ml-2 text-indigo-300 font-semibold hover:underline"
//                     >
//                       Sign in
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* 3D Styles */}
//       <style>{`
//         .rotate-y-0 { transform: rotateY(0deg); }
//         .rotate-y-180 { transform: rotateY(180deg); }
//         .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
//         .transition-transform { transform-style: preserve-3d; }
//         .relative > .absolute { transform-style: preserve-3d; }
//       `}</style>
//     </div>
//   );
// }






// import React, { useEffect, useState } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// export default function Authform({ onClose, onAuthSuccess }) {
//   const [flipped, setFlipped] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Login state
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   // Signup state
//   const [signupName, setSignupName] = useState("");
//   const [signupEmail, setSignupEmail] = useState("");
//   const [signupPassword, setSignupPassword] = useState("");
//   const [signupConfirm, setSignupConfirm] = useState("");
//   const [signupMobile, setSignupMobile] = useState("");

//   function toggleFlip() {
//     setFlipped((s) => !s);
//   }

//   // ✅ Backend signup API call
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if (signupPassword !== signupConfirm) {
//       alert("Passwords do not match");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: signupEmail,
//           mobile: signupMobile,
//           password: signupPassword,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         alert(data.message);
//         onAuthSuccess({ email: signupEmail, mobile: signupMobile });
//         toggleFlip(); // go to login after signup
//       } else {
//         alert(data.error);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//     setLoading(false);
//   };

//   // ✅ Backend login API call
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: loginEmail,
//           password: loginPassword,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         alert("Login successful");
//         onAuthSuccess({ email: loginEmail, mobile: data.user.mobile });
//       } else {
//         alert(data.error);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     AOS.init({ duration: 1000, once: false });
//   }, []);

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 mt-20"
//       data-aos="fade-left"
//     >
//       <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//         {/* Left info panel */}
//         <div className="hidden md:flex flex-col gap-4 p-8 rounded-2xl bg-white/5 border border-white/5 shadow-2xl backdrop-blur-md">
//           <h2 className="text-3xl font-extrabold text-white">Welcome back 👋</h2>
//           <p className="text-slate-300">
//             Sign in to continue or create a new account. Smooth 3D flip animation included.
//           </p>
//           <div className="mt-auto">
//             <button
//               onClick={toggleFlip}
//               className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/20 transition"
//             >
//               {flipped ? "Go to Login" : "Create account"}
//             </button>
//           </div>
//         </div>

//         {/* Right 3D card */}
//         <div className="flex items-center justify-center">
//           <div className="relative" style={{ perspective: 1200 }}>
//             <div
//               className={`w-[360px] h-[520px] relative transition-transform duration-800 ease-in-out transform ${
//                 flipped ? "rotate-y-180" : "rotate-y-0"
//               }`}
//             >
//               {/* Front (Login) */}
//               <div className="absolute inset-0 rounded-2xl shadow-2xl backface-hidden">
//                 <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white/6 to-white/3 border border-white/5 p-6 flex flex-col justify-between">
//                   <div>
//                     <h3 className="text-2xl font-bold text-white">Sign in</h3>
//                     <p className="mt-2 text-sm text-slate-300">
//                       Enter your credentials to access your account.
//                     </p>
//                     <form onSubmit={handleLogin} className="mt-6 space-y-4" aria-label="Login form">
//                       <label className="block">
//                         <span className="text-sm text-slate-300">Email</span>
//                         <input
//                           type="email"
//                           value={loginEmail}
//                           onChange={(e) => setLoginEmail(e.target.value)}
//                           required
//                           className="mt-1 w-full rounded-md px-3 py-2 bg-white/5 border border-white/6 placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         />
//                       </label>
//                       <label className="block">
//                         <span className="text-sm text-slate-300">Password</span>
//                         <input
//                           type="password"
//                           value={loginPassword}
//                           onChange={(e) => setLoginPassword(e.target.value)}
//                           required
//                           minLength={6}
//                           className="mt-1 w-full rounded-md px-3 py-2 bg-white/5 border border-white/6 placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         />
//                       </label>
//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full rounded-lg py-2 bg-indigo-600 text-white font-semibold disabled:opacity-60"
//                       >
//                         {loading ? "Signing in..." : "Sign in"}
//                       </button>
//                     </form>
//                   </div>
//                   <div className="text-sm text-slate-300 text-center">
//                     <span>Don't have an account?</span>
//                     <button
//                       onClick={toggleFlip}
//                       className="ml-2 text-indigo-300 font-semibold hover:underline"
//                     >
//                       Create one
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Back (Signup) */}
//               <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white/6 to-white/3 border border-white/5 p-6 transform rotate-y-180 backface-hidden">
//                 <div>
//                   <h3 className="text-2xl font-bold text-white">Create account</h3>
//                   <p className="mt-2 text-sm text-slate-300">
//                     Sign up to start your journey. It's quick and easy.
//                   </p>
//                   <form onSubmit={handleSignup} className="mt-6 space-y-4" aria-label="Signup form">
//                     <label className="block">
//                       <span className="text-sm text-slate-300">Email</span>
//                       <input
//                         type="email"
//                         value={signupEmail}
//                         onChange={(e) => setSignupEmail(e.target.value)}
//                         required
//                         className="mt-1 w-full rounded-md px-3 py-2 bg-white/5 border border-white/6 placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       />
//                     </label>
//                     <label className="block">
//                       <span className="text-sm text-slate-300">Mobile</span>
//                       <input
//                         type="text"
//                         value={signupMobile}
//                         onChange={(e) => setSignupMobile(e.target.value)}
//                         required
//                         className="mt-1 w-full rounded-md px-3 py-2 bg-white/5 border border-white/6 placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       />
//                     </label>
//                     <label className="block">
//                       <span className="text-sm text-slate-300">Password</span>
//                       <input
//                         type="password"
//                         value={signupPassword}
//                         onChange={(e) => setSignupPassword(e.target.value)}
//                         required
//                         minLength={6}
//                         className="mt-1 w-full rounded-md px-3 py-2 bg-white/5 border border-white/6 placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       />
//                     </label>
//                     <label className="block">
//                       <span className="text-sm text-slate-300">Confirm Password</span>
//                       <input
//                         type="password"
//                         value={signupConfirm}
//                         onChange={(e) => setSignupConfirm(e.target.value)}
//                         required
//                         minLength={6}
//                         className="mt-1 w-full rounded-md px-3 py-2 bg-white/5 border border-white/6 placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       />
//                     </label>
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="w-full rounded-lg py-2 bg-indigo-600 text-white font-semibold disabled:opacity-60"
//                     >
//                       {loading ? "Creating..." : "Create account"}
//                     </button>
//                   </form>
//                   <div className="mt-4 text-sm text-slate-300 text-center">
//                     <span>Already have an account?</span>
//                     <button
//                       onClick={toggleFlip}
//                       className="ml-2 text-indigo-300 font-semibold hover:underline"
//                     >
//                       Sign in
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Styles for 3D */}
//       <style>{`
//         .rotate-y-0 { transform: rotateY(0deg); }
//         .rotate-y-180 { transform: rotateY(180deg); }
//         .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
//         .transition-transform { transform-style: preserve-3d; }
//         .relative > .absolute { transform-style: preserve-3d; }
//       `}</style>
//     </div>
//   );
// }








import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Authform({ type = "signin", onClose, onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  // ✅ Backend signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {  // ✅ Relative path for proxy
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mobile, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        onAuthSuccess({ email, mobile });
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
    setLoading(false);
  };

  // ✅ Backend login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {  // ✅ Relative path for proxy
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Login successful");
        onAuthSuccess({ email, mobile: data.user.mobile });
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
    setLoading(false);
  };

  const handleSubmit = type === "signin" ? handleLogin : handleSignup;

  return (
    <div className="fixed inset-0 flex justify-end z-50" data-aos="fade-left">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Sliding Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 shadow-lg p-8 transform translate-x-0 transition-transform duration-300">
        <button
          className="absolute top-4 right-4 text-4xl font-bold text-gray-600 hover:text-red-600"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mt-10 mb-6 text-center">
          {type === "signin" ? "Sign In" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded mt-1 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {type === "signup" && (
            <div>
              <label className="block text-gray-700 dark:text-gray-300">Mobile Number</label>
              <input
                type="text"
                className="w-full p-2 border rounded mt-1 text-black"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded mt-1 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-500"
            disabled={loading}
          >
            {loading ? (type === "signin" ? "Signing in..." : "Creating...") : type === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
