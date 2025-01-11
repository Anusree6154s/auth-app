import * as connectRedis from "connect-redis";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
// import fs from "fs";
// import https from "https";
import passport from "passport";
// import path from "path";

import authRoutes from "./routes";
import configurePassport from "./util/passportConfig";
import { sessionOptions } from "./util/sessionConfig";
import { frontendUrl } from "./config/constants";

const app = express();

// Enable CORS
app.use(
  cors({
    origin: frontendUrl, // Allow your frontend origin
    credentials: true, // Allow cookies and credentials
  })
);

app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(session(sessionOptions)); // Configure session middleware
app.use(passport.initialize()); //iniitlaise passport
app.use(passport.session()); //initalise sessions for cookie mgmt

configurePassport(); //passport config

// // Load mTLS certificates for mutual authentication
// const certPath = path.resolve(__dirname, "..");
// console.log(path.resolve(__dirname, "..", "certs"));
// const serverOptions: https.ServerOptions = {
//   key: fs.readFileSync(path.join(certPath, "certs", "server.key")),
//   cert: fs.readFileSync(path.join(certPath, "certs", "server.crt")),
//   ca: fs.readFileSync(path.join(certPath, "certs", "ca.crt")), // CA that signed the client certificate
//   requestCert: true, // Request a client certificate
//   rejectUnauthorized: true, // Reject unauthorized clients
// };

app.use("/auth", authRoutes); //routes

// the way of server connection for mTLS auth
// https.createServer(serverOptions, app).listen(8000, () => {
//   console.log("Server listening on port 8000");
// });

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
