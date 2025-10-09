import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";
import { FaGoogle } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { auth, provider } from "../firebase"; 
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  async function signInWithGoogle() {
    try {
      console.log("Signing in with Google via Firebase...");

      // Use popup and ensure redirect points to your Vercel domain
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      console.log("Firebase user:", user);

      if (user) {
        // Explicitly navigate to your dashboard on your Vercel domain
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Firebase Google sign-in error:", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User already logged in:", user.email);
        navigate("/dashboard");
      } else {
        console.log("No active user session.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Checking session…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8 space-y-10 grid justify-center">
        <NavLink to={"/"}>
          <img className="w-24 h-24 mx-auto" src={logo} alt="Logo" />
        </NavLink>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">SIGN IN</h1>
          <p className="mt-2 text-gray-500">
            Sign in to access your dashboard and create posts
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl border border-gray-300 hover:shadow-lg transition bg-white text-gray-700 font-medium"
          >
            <FaGoogle size={24} />
            Sign in with Google
          </button>
          <p className="text-sm text-gray-400 text-center">
            Please post real products
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
