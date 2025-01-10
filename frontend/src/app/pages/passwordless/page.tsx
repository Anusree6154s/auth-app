"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "./loader";
import { FaEnvelope } from "react-icons/fa";

export default function Passwordless() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    if (!email) return toast.warn("Enter Email!");
    try {
      setLoading(true);
      const res = await fetch("/auth/passwordless/sendOTP", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setLoading(false);
      if (data.isOTPSent) {
        setIsOTPSent(true);
      } else {
        toast.error("OTP not sent in Email!");
      }
    } catch (error) {
      console.error("Passwordless Error:", error);
    }
  };

  const signiupPasswordless = async () => {
    if (!OTP) return toast.warn("Enter Email!");
    try {
      const res = await fetch("/auth/passwordless/signup", {
        method: "POST",
        body: JSON.stringify({ email, OTP }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/pages/authenticated?title=Passwordless Auth");
      } else {
        console.error(data);
        router.push("/pages/failed?title=Passwordless");
      }
    } catch (error) {
      console.error("Passwordless Error:", error);
    }
  };

  return (
    <section className="custom-container">
      <div className=" headers">
        <Link href="/">← Go back home</Link>
        <Link href="/pages/authenticated">Try authenticated page →</Link>
      </div>

      <h3 className="font-[500] text-xl">
        <FaEnvelope />
        Passwordless Auth
      </h3>

      {!isOTPSent ? (
        <input
          type="text"
          name="email"
          placeholder="Enter Email to signup"
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-sm bg-slate-50 text-gray-500 text-[12px] p-2 w-full text-center"
        />
      ) : (
        <input
          type="number"
          name="otp"
          placeholder="Enter OTP"
          onChange={(e) => setOTP(e.target.value)}
          className="rounded-sm bg-slate-50 text-gray-500 text-[12px] p-2 w-full text-center"
        />
      )}

      {!isOTPSent ? (
        <div className="buttons">
          <button onClick={sendOTP}>{loading && <Loader />}Send OTP</button>
        </div>
      ) : (
        <div className="buttons">
          <button onClick={signiupPasswordless}>Signup with OTP</button>
        </div>
      )}
      <ToastContainer hideProgressBar={true} />
    </section>
  );
}
