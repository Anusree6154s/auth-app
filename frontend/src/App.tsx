import { JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasicAuth from "./pages/BasicAuth";
import Home from "./pages/Home";
import JWT from "./pages/JWT";
import OAuth from "./pages/OAuth";
import OIDC from "./pages/OIDC";
import Passwordless from "./pages/Passwordless";
import Session from "./pages/Session";
import Authenticated from "./pages/Authenticated";
import Failed from "./pages/Failed";

function App(): JSX.Element {
  return (
    <div className="text-center bg-purple-50 text-black flex items-center justify-center h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/basicauth" element={<BasicAuth />} />
          <Route path="/pages/oauth" element={<OAuth />} />
          <Route path="/pages/jwt" element={<JWT />} />
          <Route path="/pages/session" element={<Session />} />
          <Route path="/pages/passwordless" element={<Passwordless />} />
          <Route path="/pages/oidc" element={<OIDC />} />
          <Route path="/pages/authenticated" element={<Authenticated />} />
          <Route path="/pages/failed" element={<Failed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
