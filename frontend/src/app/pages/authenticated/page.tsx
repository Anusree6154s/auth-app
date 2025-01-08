"use client";
import React from "react";
import "./index.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Authenticated() {
  const router = useRouter();

  const checkAuthOAuth = async () => {
    try {
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
      console.error("Error checking authentication", error);
    }
  };

  const logoutOAuth = async () => {
    try {
      const res = await fetch("/auth/oauth/logout");
      const data = await res.json();

      if (data.isLoggedOut) toast.success("Logged Out of OAuth!");
    } catch (error) {
      console.error("Error checking authentication", error);
    }
  };

  const checkAuthJWTHeader = async () => {
    try {
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
      console.error("Error checking authentication", error);
    }
  };

  const checkAuthJWTCookie = async () => {
    try {
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
      console.error("Error checking authentication", error);
    }
  };

  return (
    <section className="custom-container">
      <div className="headers">
        <Link href="/">← Go back home</Link>
      </div>

      <h3 className="font-[500] text-xl"> Authenticated</h3>
      <ul className="text-left list-disc text-gray-500 text-[12px] ml-5">
        <li>To retry login while authenticated, press retry OAuth login</li>
        <li>
          To retry login from beginning, logout and then retry OAuth login
        </li>
      </ul>

      <div className=" buttons ">
        <button onClick={logoutOAuth}>Logout of OAuth session</button>
        <button onClick={checkAuthOAuth}>Retry OAuth Login</button>
        <button onClick={checkAuthJWTHeader}>Retry JWT Header Login</button>
        <button onClick={checkAuthJWTCookie}>Retry JWT Cookie Login</button>
      </div>
    </section>
  );
}
