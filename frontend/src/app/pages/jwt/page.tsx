"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

export default function Jwt() {
  const router = useRouter();
  const [input, setInput] = useState("");

  const loginViaHeader = async () => {
    if (!input) return toast.warn("Enter Username!");
    try {
      // we recieve token via body while signin
      // and set it in localstorage for verification everytime
      const res = await fetch("/auth/jwt/headers/signin", {
        method: "POST",
        body: JSON.stringify({ username: input }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/pages/authenticated?title=JWT via Header");
      } else {
        console.error(data);
        router.push("/pages/failed?title=JWT via Header");
      }
    } catch (error) {
      console.error("Error checking authentication", error);
    }
  };

  const loginViaCookies = async () => {
    // we recieve token via cookies while signin
    // no need to set/send token to backend
    // backend accesses token by itself from cookies
    if (!input) return toast.warn("Enter Username!");
    try {
      const res = await fetch("/auth/jwt/cookies/signin", {
        method: "POST",
        body: JSON.stringify({ username: input }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) router.push("/pages/authenticated?title=JWT via Cookies");
      else  router.push("/pages/failed?title=JWT via Cookies");
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

      <h3 className="font-[500] text-xl"><FaShieldAlt />JWT Token</h3>

      <input
        type="text"
        placeholder="Enter Username to signin"
        onChange={(e) => setInput(e.target.value)}
        className="rounded-sm bg-slate-50 text-gray-500 text-[12px] p-2 w-full text-center"
      />

      <div className=" buttons ">
        <button onClick={loginViaHeader}>Signin via header/res</button>
        <button onClick={loginViaCookies}>Signin via cookies</button>
      </div>
      <ToastContainer hideProgressBar={true} />
    </section>
  );
}
