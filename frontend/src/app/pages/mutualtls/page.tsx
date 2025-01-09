"use client";

// import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import "./index.css";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const loginMTLS = async () => {
    if (!username) return toast("Enter Username!");
    try {
      const res = await fetch("/api/mutualtls", {
        method: "POST",
        body: JSON.stringify({ username }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) router.push("/pages/authenticated");
    } catch (error) {
      console.error('mTLS login error:',error);
    }
  };

  return (
    <main className="custom-container">
      <div className=" headers">
        <Link href="/">← Go back home</Link>
        <Link href="/pages/authenticated">Try authenticated page →</Link>
      </div>

      <h3 className="headers">Mutual TLS Authentication</h3>
      <input
        type="text"
        placeholder="Enter Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="buttons">
        <button onClick={loginMTLS}>Login</button>
      </div>
    </main>
  );
}
