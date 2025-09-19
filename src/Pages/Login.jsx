import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";
import { FaGoogle } from "react-icons/fa6";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  async function signInWithGoogle() {
    const redirectTo =
  import.meta.env.MODE === "development"
    ? "http://localhost:5173/login"
    : "https://shareupup.vercel.app/login";


    console.log("Signing in with Google...");
    console.log("redirectTo:", redirectTo);
    console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });

      if (error) {
        console.error("Supabase OAuth error:", error);
      } else {
        console.log("Supabase OAuth data:", data);
        if (data?.url) {
          console.log("Full OAuth URL sent to Google:", data.url);
        } else {
          console.log("No OAuth URL returned from Supabase");
        }
      }
    } catch (err) {
      console.error("Unexpected error during signInWithOAuth:", err);
    }
  }

  useEffect(() => {
    console.log("Checking existing Supabase session...");
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Current session:", session);
      if (session?.user) {
        console.log("User already logged in, navigating to /dashboard");
        navigate("/dashboard");
      } else {
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session);
      if (session?.user) navigate("/dashboard");
    });

    return () => listener.subscription.unsubscribe();
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
