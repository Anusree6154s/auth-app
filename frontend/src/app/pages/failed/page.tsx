import Link from "next/link";
import React from "react";
import "./index.css";

export default function Failed() {
  return (
    <section className="custom-container">
      <div className="headers">
        <Link href="/">← Go back home</Link>
      </div>

      <h3 className="font-[500] text-xl"> Authentication Failed</h3>

      <div className="buttons">
        <Link href="/pages/oauth">Retry OAuth Login</Link>
      </div>
    </section>
  );
}
