import Link from "next/link";
import {
  FaGoogle,
  FaFacebook,
  FaGithub,
  FaTwitter,
  FaKey,
} from "react-icons/fa";

export default function Oauth() {
  return (
    <section className="custom-container">
      <div className="text-[10px] text-gray-500 flex justify-between w-full">
        <Link href="/">← Go back home</Link>
        <Link href="/pages/authenticated">Try authenticated page →</Link>
      </div>

      <h3>
        <FaKey /> Common Passport Strategies
      </h3>

      <div className="buttons">
        <Link href="/auth/oauth/google">
          <button className="flex gap-4 items-center">
            <FaGoogle /> Login with Google
          </button>
        </Link>
        <Link href="/auth/oauth/facebook">
          <button className="flex gap-4 items-center">
            <FaFacebook /> Login with Facebook
          </button>
        </Link>
        <Link href="/auth/oauth/twitter">
          <button className="flex gap-4 items-center">
            <FaTwitter /> Login with Twitter
          </button>
        </Link>
        <Link href="/auth/oauth/github">
          <button className="flex gap-4 items-center">
            <FaGithub /> Login with Github
          </button>
        </Link>
      </div>
    </section>
  );
}
