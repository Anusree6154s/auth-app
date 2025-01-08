import Link from "next/link";
import React from "react";
import "./index.css";

export default function Oauth() {
  return (
    <section className="custom-container">
      <div className="text-[10px] text-gray-500 flex justify-between w-full">
        <Link href="/">← Go back home</Link>
        <Link href="/pages/authenticated">Try authenticated page →</Link>
      </div>

      <h3>Some Common Passport Strategies</h3>

      <div className="buttons">
        <Link href="/auth/oauth/google">
          <button>Login with Google</button>
        </Link>
        <Link href="/auth/oauth/facebook">
          <button>Login with Facebook</button>
        </Link>
        <Link href="/auth/oauth/twitter">
          <button>Login with Twitter</button>
        </Link>
        <Link href="/auth/oauth/github">
          <button>Login with Github</button>
        </Link>
      </div>
    </section>
  );
}
