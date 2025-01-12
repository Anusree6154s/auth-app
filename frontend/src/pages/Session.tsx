"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

const Session: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await fetch("/auth/session/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (res.ok) {
        navigate("/pages/authenticated?title=Session Auth");
      } else {
        navigate("/pages/failed?title=Session");
      }
    } catch (error) {
      console.error("Session Auth Signup Error:", error);
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
        <AiOutlineUser />
        Session Auth
      </h3>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="rounded-sm bg-slate-50 text-gray-500 text-[12px] p-2 w-full text-center"
      />
      <div className="buttons">
        <button onClick={handleSignup}>Signup</button>
      </div>
    </main>
  );
};

export default Session;
