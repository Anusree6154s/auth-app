"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "./index.css";

export default function Authenticated() {
  const router = useRouter();

  const checkAuthOAuth = async () => {
    try {
      // verification occus automatically in backend
      const res = await fetch("/auth/oauth/check-auth");
      const data = await res.json();

      if (!data.isAuthenticated) router.push("/pages/oauth");
      else
        toast.success(
          <div className="flex flex-col font-[Poppins]">
            <span>Already Authenticated!</span>
            <span className="text-gray-400 text-[10px]">
              Logout OAuth to Retry Login
            </span>
          </div>
        );
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  const logoutOAuth = async () => {
    try {
      const res = await fetch("/auth/oauth/logout");
      const data = await res.json();

      if (data.isLoggedOut) toast.success("Logged Out of OAuth!");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const checkAuthJWTHeader = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      // verify token via header
      const res = await fetch("/auth/jwt/headers/check-auth", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!data.isAuthenticated) router.push("/pages/jwt");
      else
        toast.success(
          <div className="flex flex-col font-[Poppins]">
            <span>Already Authenticated!</span>
            <span className="text-gray-400 text-[10px]">
              Logout JWT Headers to Retry Login
            </span>
          </div>
        );
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  const logoutJWTHeader = async () => {
    const token = localStorage.getItem("token") || "";
    if (!token) return toast.success("Already Logged Out of JWT Header!");
    try {
      const res = await fetch("/auth/jwt/headers/logout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.isLoggedOut) {
        localStorage.removeItem("token");
        toast.success("Logged Out of JWT Header!");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const checkAuthJWTCookie = async () => {
    try {
      const res = await fetch("/auth/jwt/cookies/check-auth");
      const data = await res.json();

      if (!data.isAuthenticated) router.push("/pages/jwt");
      else
        toast.success(
          <div className="flex flex-col font-[Poppins]">
            <span>Already Authenticated!</span>
            <span className="text-gray-400 text-[10px]">
              Logout JWT Cookie to Retry Login
            </span>
          </div>
        );
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  const logoutJWTCookie = async () => {
    const token = document.cookie
      .split("; ") // Split cookies into individual pairs
      .find((row) => row.startsWith("token="));
    if (!token) return toast.success("Already Logged Out of JWT Cookies!");

    try {
      const res = await fetch("/auth/jwt/cookies/logout");
      const data = await res.json();

      if (data.isLoggedOut) toast.success("Logged Out of JWT Cookies!");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const checkAuthPasswordlessAuth = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      // verify token via header
      const res = await fetch("/auth/passwordless/check-auth", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!data.isAuthenticated) router.push("/pages/passwordless");
      else
        toast.success(
          <div className="flex flex-col font-[Poppins]">
            <span>Already Authenticated!</span>
            <span className="text-gray-400 text-[10px]">
              Logout Passwordless Auth to Retry Login
            </span>
          </div>
        );
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  const logoutPasswordlessAuth = async () => {
    const token = localStorage.getItem("token") || "";
    if (!token) return toast.success("Already Logged Out of Passwordless Auth!");
    try {
      const res = await fetch("/auth/passwordless/logout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.isLoggedOut) {
        localStorage.removeItem("token");
        toast.success("Logged Out of Passwordless Auth!");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <section className="custom-container">
      <div className="headers">
        <Link href="/">← Go back home</Link>
      </div>

      <h3 className="font-[500] text-xl"> Authenticated</h3>
      <ul className="text-left list-disc text-gray-500 text-[12px] ml-5">
        <li>To retry login while authenticated, just press Retry Login</li>
        <li>To retry login from beginning, logout and then Retry Login</li>
      </ul>

      <div className=" buttons ">
        <button onClick={logoutOAuth} className="!bg-red-200">
          Logout of OAuth session
        </button>
        <button onClick={checkAuthOAuth}>Retry OAuth Login</button>
        <button onClick={logoutJWTHeader} className="!bg-red-200">
          Logout of JWT Header session
        </button>
        <button onClick={checkAuthJWTHeader}>Retry JWT Header Login</button>
        <button onClick={logoutJWTCookie} className="!bg-red-200">
          Logout of JWT Cookie session
        </button>
        <button onClick={checkAuthJWTCookie}>Retry JWT Cookie Login</button>
        <button onClick={logoutPasswordlessAuth} className="!bg-red-200">
          Logout of Passwordless Auth session
        </button>
        <button onClick={checkAuthPasswordlessAuth}>
          Retry Passwordless Auth Login
        </button>
      </div>
      <ToastContainer hideProgressBar={true} />
    </section>
  );
}
