import React, { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const JWT: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<string>("");

  const loginViaHeader = async () => {
    if (!input) {
      toast.warn("Enter Username!");
      return;
    }
    try {
      const res = await fetch("/auth/jwt/headers/signin", {
        method: "POST",
        body: JSON.stringify({ username: input }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/pages/authenticated?title=JWT via Header");
      } else {
        console.error(data);
        navigate("/pages/failed?title=JWT via Header");
      }
    } catch (error) {
      console.error("Error checking authentication", error);
    }
  };

  const loginViaCookies = async () => {
    if (!input) {
      toast.warn("Enter Username!");
      return;
    }
    try {
      const res = await fetch("/auth/jwt/cookies/signin", {
        method: "POST",
        body: JSON.stringify({ username: input }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        navigate("/pages/authenticated?title=JWT via Cookies");
      } else {
        navigate("/pages/failed?title=JWT via Cookies");
      }
    } catch (error) {
      console.error("Error checking authentication", error);
    }
  };

  return (
    <section className="custom-container">
      <div className="headers">
        <Link to="/">← Go back home</Link>
        <Link to="/pages/authenticated">Try authenticated page →</Link>
      </div>

      <h3 className="font-[500] text-xl">
        <FaShieldAlt /> JWT Token
      </h3>

      <input
        type="text"
        placeholder="Enter Username to signin"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="rounded-sm bg-slate-50 text-gray-500 text-[12px] p-2 w-full text-center"
      />

      <div className="buttons">
        <button onClick={loginViaHeader}>Signin via header/res</button>
        <button onClick={loginViaCookies}>Signin via cookies</button>
      </div>

      <ToastContainer hideProgressBar={true} />
    </section>
  );
};

export default JWT;
