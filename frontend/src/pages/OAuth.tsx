import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaKey,
  FaTwitter,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OAuth: React.FC = () => {
  const navigate = useNavigate(); // React Router navigation hook

  return (
    <section className="custom-container">
      <div className="text-[10px] text-gray-500 flex justify-between w-full">
        <button onClick={() => navigate("/")}>← Go back home</button>
        <button onClick={() => navigate("/pages/authenticated")}>
          Try authenticated page →
        </button>
      </div>

      <h3>
        <FaKey /> Common Passport Strategies
      </h3>

      <div className="buttons">
        {/* https://stackoverflow.com/questions/72382892/access-to-fetch-at-https-accounts-google-com-o-oauth2-v2-auth-has-been-blocked */}
        <a
          href="http://localhost:8000/auth/oauth/google"
          className="flex gap-4 items-center"
        >
          <FaGoogle /> Login with Google
        </a>
        <a
          href="http://localhost:8000/auth/oauth/facebook"
          className="flex gap-4 items-center"
        >
          <FaFacebook /> Login with Facebook
        </a>
        {/* redirect uris not changed for these below */}
        {/* <a
          href="http://localhost:8000/auth/oauth/twitter"
          className="flex gap-4 items-center"
        >
          <FaTwitter /> Login with Twitter
        </a>
        <a
          href="http://localhost:8000/auth/oauth/github"
          className="flex gap-4 items-center"
        >
          <FaGithub /> Login with Github
        </a> */}
      </div>
    </section>
  );
};

export default OAuth;
