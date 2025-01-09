"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./index.css";
import Link from "next/link";

export default function BasicAuth() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

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
        router.push(
          "/pages/authenticated" + `?username=${username}&password=${password}`
        );
      } else {
        toast.error("Basic Auth Signup Error");
      }
    } catch (error) {
      console.error("Basic Auth Signup Error:", error);
    }
  };

  return (
    <main className="custom-container">
      <div className=" headers">
        <Link href="/">← Go back home</Link>
        <Link href="/pages/authenticated">Try authenticated page →</Link>
      </div>

      <h3>Basic Auth</h3>
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
}
