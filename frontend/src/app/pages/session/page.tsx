"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";

export default function Session() {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

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
        router.push("/pages/authenticated?title=Session Auth");
      } else {
        router.push("/pages/failed?title=Session");
      }
    } catch (error) {
      console.error("Session Auth Signup Error:", error);
    }
  };

  return (
    <main className="custom-container">
      <div className=" headers">
        <Link href="/">← Go back home</Link>
        <Link href="/pages/authenticated">Try authenticated page →</Link>
      </div>

      <h3><AiOutlineUser />Session Auth</h3>
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
}
