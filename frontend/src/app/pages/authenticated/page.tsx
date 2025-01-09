"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "./index.css";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

export default function AuthenticatedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsComponent />
    </Suspense>
  );
}

function SearchParamsComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const checkAuthBasicAuth = async () => {
    const username = searchParams.get("username");
    const password = searchParams.get("password");
    try {
      const res = await fetch("/auth/basicauth/check-auth", {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(username + ":" + password)}`,
        },
      });
      const data = await res.json();

      if (!data.isAuthenticated) router.push("/pages/basicauth");
      else
        toast.success(
          <div className="flex flex-col font-[Poppins]">
            <span>Already Authenticated!</span>
            <span className="text-gray-400 text-[10px]">
              Logout Basic Auth to Retry Login
            </span>
          </div>
        );
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  const logoutBasicAuth = async () => {
    if (isLoggedOut) return toast.success("Already Logged Out of Basic Auth!");

    const username = searchParams.get("username");
    const password = searchParams.get("password");
    try {
      const res = await fetch("/auth/basicauth/logout", {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(username + ":" + password)}`,
        },
      });
      const data = await res.json();

      if (data.isLoggedOut) {
        toast.success("Logged Out of Basic Auth!");
        setIsLoggedOut(true);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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

  const checkAuthSession = async () => {
    try {
      const res = await fetch("/auth/session/check-auth");
      const data = await res.json();

      if (!data.isAuthenticated) router.push("/pages/session");
      else
        toast.success(
          <div className="flex flex-col font-[Poppins]">
            <span>Already Authenticated!</span>
            <span className="text-gray-400 text-[10px]">
              Logout Session Auth to Retry Login
            </span>
          </div>
        );
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  const logoutSession = async () => {
    if (isLoggedOut)
      return toast.success("Already Logged Out of Session Auth!");

    try {
      const res = await fetch("/auth/session/logout");
      const data = await res.json();

      if (data.isLoggedOut) {
        toast.success("Logged Out of Session Auth!");
        setIsLoggedOut(true);
      }
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
    if (!token)
      return toast.success("Already Logged Out of Passwordless Auth!");
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

  const checkAuthOIDC = async () => {
    try {
      // verification occus automatically in backend
      const res = await fetch("/auth/oidc/check-auth");
      const data = await res.json();

      if (!data.isAuthenticated) router.push("/pages/oidc");
      else
        toast.success(
          <div className="flex flex-col font-[Poppins]">
            <span>Already Authenticated!</span>
            <span className="text-gray-400 text-[10px]">
              Logout OIDC Auth to Retry Login
            </span>
          </div>
        );
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  const logoutOIDC = async () => {
    if (isLoggedOut) return toast.success("Already Logged Out of OIDC Auth!");
    try {
      const res = await fetch("/auth/oidc/logout");
      const data = await res.json();

      if (data.isLoggedOut) {
        toast.success("Logged Out of OIDC Auth!");
        setIsLoggedOut(true);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const checkAuthMTLS = async () => {
    try {
      // verification occus automatically in backend
      const res = await fetch("/auth/mutualtls/check-auth");
      const data = await res.json();

      if (!data.isAuthenticated) router.push("/pages/mutualtls");
      else
        toast.success(
          <div className="flex flex-col font-[Poppins]">
            <span>Already Authenticated!</span>
            <span className="text-gray-400 text-[10px]">
              Logout OIDC Auth to Retry Login
            </span>
          </div>
        );
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  const logoutMTLS = async () => {
    if (isLoggedOut) return toast.success("Already Logged Out of OIDC Auth!");
    try {
      const res = await fetch("/auth/mutualtls/logout");
      const data = await res.json();

      if (data.isLoggedOut) {
        toast.success("Logged Out of OIDC Auth!");
        setIsLoggedOut(true);
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
        <div className="inner">
          <button onClick={checkAuthBasicAuth}>Retry Basic Auth Login</button>
          <button onClick={logoutBasicAuth}>
            Logout of Basic Auth session
          </button>
        </div>

        <div className="inner">
          <button onClick={checkAuthOAuth}>Retry OAuth Login</button>
          <button onClick={logoutOAuth}>Logout of OAuth session</button>
        </div>

        <div className="inner">
          <button onClick={checkAuthJWTCookie}>Retry JWT Cookie Login</button>
          <button onClick={logoutJWTCookie}>
            Logout of JWT Cookie session
          </button>
        </div>

        <div className="inner">
          <button onClick={checkAuthJWTHeader}>Retry JWT Header Login</button>
          <button onClick={logoutJWTHeader}>
            Logout of JWT Header session
          </button>
        </div>

        <div className="inner">
          <button onClick={checkAuthSession}>Retry Session Auth Login</button>
          <button onClick={logoutSession}>
            Logout of Session Auth session
          </button>
        </div>

        <div className="inner">
          <button onClick={checkAuthPasswordlessAuth}>
            Retry Passwordless Auth Login
          </button>
          <button onClick={logoutPasswordlessAuth}>
            Logout of Passwordless Auth session
          </button>
        </div>

        <div className="inner">
          <button onClick={checkAuthOIDC}>Retry OIDC Auth Login</button>
          <button onClick={logoutOIDC}>Logout of OIDC Auth session</button>
        </div>

        <div className="inner">
          <button onClick={checkAuthMTLS}>Retry mTLS Auth Login</button>
          <button onClick={logoutMTLS}>Logout of mTLS Auth session</button>
        </div>
      </div>
      <ToastContainer hideProgressBar={true} />
    </section>
  );
}
