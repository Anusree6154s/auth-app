import Link from "next/link";
// import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Passwordless() {
  //   const router = useRouter();
  const [input, setInput] = useState("");

  const loginOTP = async () => {
    if (!input) return toast.warn("Enter Email!");
    try {
    } catch (error) {
      console.error("PAsswordless Error:", error);
    }
  };

  return (
    <section className="custom-container">
      <div className=" headers">
        <Link href="/">← Go back home</Link>
        <Link href="/pages/authenticated">Try authenticated page →</Link>
      </div>

      <h3 className="font-[500] text-xl">Methods of passing JWT Token</h3>

      <input
        type="text"
        placeholder="Enter Email to signin"
        onChange={(e) => setInput(e.target.value)}
        className="rounded-sm bg-slate-50 text-gray-500 text-[12px] p-2 w-full text-center"
      />

      <div className=" buttons ">
        <button onClick={loginOTP}>Signin</button>
      </div>
      <ToastContainer hideProgressBar={true} />
    </section>
  );
}
