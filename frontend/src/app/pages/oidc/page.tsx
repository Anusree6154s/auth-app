import Link from "next/link";
import "./index.css";

export default function Oauth() {
  return (
    <section className="custom-container">
      <div className="text-[10px] text-gray-500 flex justify-between w-full">
        <Link href="/">← Go back home</Link>
        <Link href="/pages/authenticated">Try authenticated page →</Link>
      </div>

      <h3>OpenID Connect Auth</h3>

      <div className="buttons">
        <Link href="/auth/oidc/login">
          <button>Login with OpenID</button> Connect
        </Link>
      </div>
    </section>
  );
}
