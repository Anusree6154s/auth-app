import { JSX, useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaEnvelope, FaKey, FaShieldAlt } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { IoLogoWebComponent } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styles from "../styles/authenticated.module.css";
import { Link } from "react-router-dom";

export default function AuthenticatedPage(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    setTitle(searchParams.get("title") || "");
  }, [searchParams]);

  const checkAuthBasicAuth = async (): Promise<void> => {
    const username = searchParams.get("username") || "";
    const password = searchParams.get("password") || "";
    try {
      const res = await fetch("/auth/basicauth/check-auth", {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(username + ":" + password)}`,
        },
      });
      const data = await res.json();

      if (!data.isAuthenticated) navigate("/pages/basicauth");
      else
        toast.success(
          <div className="flex flex-col ">
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

  const logoutBasicAuth = async (): Promise<void> => {
    if (isLoggedOut) {
      toast.success("Already Logged Out of Basic Auth!");
      return;
    }

    const username = searchParams.get("username") || "";
    const password = searchParams.get("password") || "";
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

  const checkAuthOAuth = async (): Promise<void> => {
    try {
      const res = await fetch("/auth/oauth/check-auth");
      const data = await res.json();

      if (!data.isAuthenticated) navigate("/pages/oauth");
      else
        toast.success(
          <div className="flex flex-col ">
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

  const logoutOAuth = async (): Promise<void> => {
    if (isLoggedOut) {
      toast.success("Already Logged Out of OAuth!");
      return;
    }
    try {
      const res = await fetch("/auth/oauth/logout");
      const data = await res.json();

      if (data.isLoggedOut) {
        toast.success("Logged Out of OAuth!");
        setIsLoggedOut(true);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const checkAuthJWTHeader = async (): Promise<void> => {
    const token = localStorage.getItem("token") || "";
    try {
      const res = await fetch("/auth/jwt/headers/check-auth", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!data.isAuthenticated) navigate("/pages/jwt");
      else
        toast.success(
          <div className="flex flex-col ">
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

  const logoutJWTHeader = async (): Promise<void> => {
    const token = localStorage.getItem("token") || "";
    if (!token) {
      toast.success("Already Logged Out of JWT Header!");
      return;
    }
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

  const checkAuthJWTCookie = async (): Promise<void> => {
    try {
      const res = await fetch("/auth/jwt/cookies/check-auth");
      const data = await res.json();

      if (!data.isAuthenticated) navigate("/pages/jwt");
      else
        toast.success(
          <div className="flex flex-col ">
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

  const logoutJWTCookie = async (): Promise<void> => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (!token) {
      toast.success("Already Logged Out of JWT Cookies!");
      return;
    }
    try {
      const res = await fetch("/auth/jwt/cookies/logout");
      const data = await res.json();

      if (data.isLoggedOut) toast.success("Logged Out of JWT Cookies!");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const checkAuthSession = async (): Promise<void> => {
    try {
      const res = await fetch("/auth/session/check-auth");
      const data = await res.json();

      if (!data.isAuthenticated) navigate("/pages/session");
      else
        toast.success(
          <div className="flex flex-col ">
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

  const logoutSession = async (): Promise<void> => {
    if (isLoggedOut) {
      toast.success("Already Logged Out of Session Auth!");
      return;
    }

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

  const checkAuthPasswordlessAuth = async (): Promise<void> => {
    const token = localStorage.getItem("token") || "";
    try {
      const res = await fetch("/auth/passwordless/check-auth", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!data.isAuthenticated) navigate("/pages/passwordless");
      else
        toast.success(
          <div className="flex flex-col ">
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

  const logoutPasswordlessAuth = async (): Promise<void> => {
    const token = localStorage.getItem("token") || "";
    if (!token) {
      toast.success("Already Logged Out of Passwordless Auth!");
      return;
    }

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

  const checkAuthOIDC = async (): Promise<void> => {
    try {
      const res = await fetch("/auth/oidc/check-auth");
      const data = await res.json();

      if (!data.isAuthenticated) navigate("/pages/oidc");
      else
        toast.success(
          <div className="flex flex-col ">
            <span>Already Authenticated!</span>
            <span className="text-gray-400 text-[10px]">
              Logout OIDC to Retry Login
            </span>
          </div>
        );
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  const logoutOIDC = async (): Promise<void> => {
    if (isLoggedOut) {
      toast.success("Already Logged Out of OIDC!");
      return;
    }

    try {
      const res = await fetch("/auth/oidc/logout");
      const data = await res.json();

      if (data.isLoggedOut) {
        toast.success("Logged Out of OIDC!");
        setIsLoggedOut(true);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <section className={styles["custom-container"]}>
      <div className={styles.headers}>
        <Link to="/">← Go back home</Link>
      </div>

      <h3 className="font-[500] text-xl">Authenticated {title}</h3>
      <ul className="text-left list-disc text-gray-500 text-[12px] ml-5">
        <li>To retry login while authenticated, just press Retry Login</li>
        <li>To retry login from beginning, logout and then Retry Login</li>
      </ul>

      <div className={styles.buttons}>
        <div className={styles.inner}>
          <span>
            <FiLock />
          </span>
          <button onClick={checkAuthBasicAuth}>Retry Basic Auth Login</button>
          <button onClick={logoutBasicAuth}>
            Logout of Basic Auth session
          </button>
        </div>

        <div className={styles.inner}>
          <span>
            <FaKey />
          </span>
          <button onClick={checkAuthOAuth}>Retry OAuth Login</button>
          <button onClick={logoutOAuth}>Logout of OAuth session</button>
        </div>

        <div className={styles.inner}>
          <span>
            <FaShieldAlt />
          </span>
          <button onClick={checkAuthJWTHeader}>Retry JWT Header Login</button>
          <button onClick={logoutJWTHeader}>
            Logout of JWT Header session
          </button>
        </div>

        <div className={styles.inner}>
          <span>
            <FaShieldAlt />
          </span>
          <button onClick={checkAuthJWTCookie}>Retry JWT Cookie Login</button>
          <button onClick={logoutJWTCookie}>
            Logout of JWT Cookie session
          </button>
        </div>

        <div className={styles.inner}>
          <span>
            <AiOutlineUser />
          </span>
          <button onClick={checkAuthSession}>Retry Session Auth Login</button>
          <button onClick={logoutSession}>
            Logout of Session Auth session
          </button>
        </div>

        <div className={styles.inner}>
          <span>
            <FaEnvelope />
          </span>

          <button onClick={checkAuthPasswordlessAuth}>
            Retry Passwordless Auth Login
          </button>
          <button onClick={logoutPasswordlessAuth}>
            Logout of Passwordless Auth session
          </button>
        </div>

        <div className={styles.inner}>
          <span>
            <IoLogoWebComponent />
          </span>
          <button onClick={checkAuthOIDC}>Retry OIDC Auth Login</button>
          <button onClick={logoutOIDC}>Logout of OIDC Auth session</button>
        </div>

        {/* <div className={styles.inner}>
          <span>
            <MdVpnKey />
          </span>
          <button onClick={checkAuthMTLS}>Retry mTLS Auth Login</button>
          <button onClick={logoutMTLS}>Logout of mTLS Auth session</button>
        </div> */}
      </div>
      <ToastContainer hideProgressBar={true} />
    </section>
  );
}
