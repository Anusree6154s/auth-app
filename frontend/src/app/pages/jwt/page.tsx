"use client";
import React from "react";
import "./index.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Jwt() {
  const router = useRouter();

  const loginViaHeader = async () => {
    try {
      const res = await fetch("/auth/jwt/headers/login");
      const data = await res.json();
      if (res.ok) router.push("/pages/authenticated");
      else console.error(data);
    } catch (error) {
      console.error("Error checking authentication", error);
    }
  };

  const loginViaCookies = async () => {
    try {
      const res = await fetch("/auth/jwt/headers/cookies");
      const data = await res.json();
      if (res.ok) router.push("/pages/authenticated");
      else console.error(data);
    } catch (error) {
      console.error("Error checking authentication", error);
    }
  };

  return (
    <section className="custom-container">
      <div className=" headers">
        <Link href="/">← Go back home</Link>
        <Link href="/pages/authenticated">Try authenticated page →</Link>
      </div>

      <h3 className="font-[500] text-xl">Methods of passing JWT Token</h3>

      <div className=" buttons ">
        <button onClick={loginViaHeader}>Login via header/res</button>
        <button onClick={loginViaCookies}>Login via cookies</button>
      </div>
    </section>
  );
}
