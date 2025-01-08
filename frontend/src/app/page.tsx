import Link from "next/link";
import "./index.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div className="bg-white rounded-md md:w-[30vw] h-[80vh] flex flex-col gap-6 justify-center p-[20px]">
      <h3 className="font-[500] text-xl">Home Page</h3>
      <h4 className=" text-gray-500">Authentication Methods</h4>
      <div className="flex mx-auto w-[60%] flex-col gap-3 buttons">
        <Link href="/pages/oauth">OAuth</Link>
        <Link href="/pages/jwt">JWT</Link>
        <Link href="/pages/passwordless"> Passwordless</Link>
        <Link href="/pages/tls"> Mututal TLS </Link>
        <Link href="/pages/oidc"> OpenID Connect </Link>
      </div>
      <ToastContainer hideProgressBar={true} />
    </div>
  );
}
