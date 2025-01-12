import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";

const BasicAuth: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate(); // React Router navigation hook

  const handleSignup = async () => {
    try {
      const res = await fetch("/auth/basicauth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        navigate(
          `/pages/authenticated?title=Basic Auth&username=${username}&password=${password}`
        );
      } else {
        navigate("/pages/failed?title=Basic Auth");
      }
    } catch (error) {
      console.error("Basic Auth Signup Error:", error);
    }
  };

  return (
    <main className="custom-container">
      <div className="headers">
        <button onClick={() => navigate("/")}>← Go back home</button>
        <button onClick={() => navigate("/pages/authenticated")}>
          Try authenticated page →
        </button>
      </div>

      <h3>
        <FiLock /> Basic Auth
      </h3>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="rounded-sm bg-slate-50 text-gray-500 text-[12px] p-2 w-full text-center"
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-sm bg-slate-50 text-gray-500 text-[12px] p-2 w-full text-center"
      />
      <div className="buttons">
        <button onClick={handleSignup}>Signup</button>
      </div>
    </main>
  );
};

export default BasicAuth;
