import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Home: React.FC = () => {
  return (
    <div className="bg-white rounded-md md:w-[30vw] h-[80vh] flex flex-col gap-6 justify-center p-[20px]">
      <h3 className="font-[500] text-xl block text-center">Home Page</h3>
      <h4 className="text-gray-500">Authentication Methods</h4>
      <div className="flex mx-auto w-[60%] flex-col gap-3 buttons">
        <Link to="/pages/basicauth">Basic Auth</Link>
        <Link to="/pages/oauth">OAuth</Link>
        <Link to="/pages/jwt">JWT</Link>
        <Link to="/pages/session">Session</Link>
        <Link to="/pages/passwordless">Passwordless</Link>
        <Link to="/pages/oidc">OpenID Connect</Link>
      </div>
    </div>
  );
};

export default Home;
