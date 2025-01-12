"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaEnvelope } from "react-icons/fa";
import { Loader } from "../components/Loader";

const Passwordless: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [isOTPSent, setIsOTPSent] = useState<boolean>(false);
  const [OTP, setOTP] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendOTP = async () => {
    if (!email) {
      toast.warn("Enter Email!");
      return;
    }
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
      setLoading(false);
    }
  };

  const signupPasswordless = async () => {
    if (!OTP) {
      toast.warn("Enter OTP!");
      return;
    }
    try {
      const res = await fetch("/auth/passwordless/signup", {
        method: "POST",
        body: JSON.stringify({ email, OTP }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/pages/authenticated?title=Passwordless Auth");
      } else {
        console.error(data);
        navigate("/pages/failed?title=Passwordless");
      }
    } catch (error) {
      console.error("Passwordless Error:", error);
    }
  };

  return (
    <section className="custom-container">
      <div className="headers">
        <button onClick={() => navigate("/")}>← Go back home</button>
        <button onClick={() => navigate("/pages/authenticated")}>
          Try authenticated page →
        </button>
      </div>

      <h3 className="font-[500] text-xl">
        <FaEnvelope />
        Passwordless Auth
      </h3>

      {!isOTPSent ? (
        <input
          type="email"
          name="email"
          placeholder="Enter Email to signup"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-sm bg-slate-50 text-gray-500 text-[12px] p-2 w-full text-center"
        />
      ) : (
        <input
          type="number"
          name="otp"
          placeholder="Enter OTP"
          value={OTP}
          onChange={(e) => setOTP(e.target.value)}
          className="rounded-sm bg-slate-50 text-gray-500 text-[12px] p-2 w-full text-center"
        />
      )}

      {!isOTPSent ? (
        <div className="buttons">
          <button onClick={sendOTP}>
            {loading && <Loader />}
            Send OTP
          </button>
        </div>
      ) : (
        <div className="buttons">
          <button onClick={signupPasswordless}>Signup with OTP</button>
        </div>
      )}
      <ToastContainer hideProgressBar={true} />
    </section>
  );
};

export default Passwordless;
