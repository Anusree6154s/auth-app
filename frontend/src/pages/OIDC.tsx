import React from "react";
import { IoLogoWebComponent } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const OIDC: React.FC = () => {
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
        <IoLogoWebComponent />
        OpenID Connect Auth
      </h3>

      <div className="buttons">
        {/* <button onClick={() => fetch("/auth/oidc/login")}>
          Login with OpenID Connect
        </button> */}
        <a
          href="http://localhost:8000/auth/oidc/login"
          className="flex gap-4 items-center"
        >
          Login with OpenID Connect
        </a>
      </div>
    </section>
  );
};

export default OIDC;
