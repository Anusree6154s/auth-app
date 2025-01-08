import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import fs from "fs";
import https from "https";
import passport from "passport";
import path from "path";
import { session_secret } from "./config/constants";
import authRoutes from "./routes";
import configurePassport from "./util/passportConfig";

const app = express();

// Enable CORS
app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"], // Allow your frontend origin
    credentials: true, // Allow cookies and credentials
  })
);

app.use(express.json());
app.use(cookieParser());

// Configure session middleware
app.use(
  session({
    secret: session_secret, // Replace with a secure key
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize()); //iniitlaise passport
app.use(passport.session()); //initalise sessions for cookie mgmt

configurePassport(); //passport config

// Load mTLS certificates for mutual authentication
const certPath = path.resolve(__dirname, "..");
console.log(path.resolve(__dirname, "..", "certs"))
const serverOptions: https.ServerOptions = {
  key: fs.readFileSync(path.join(certPath, "certs", "server.key")),
  cert: fs.readFileSync(path.join(certPath, "certs", "server.crt")),
  ca: fs.readFileSync(path.join(certPath, "certs", "ca.crt")), // CA that signed the client certificate
  requestCert: true, // Request a client certificate
  rejectUnauthorized: true, // Reject unauthorized clients
};

app.use("/auth", authRoutes); //routes

// ths way of server connection for mTLS auth
https.createServer(serverOptions, app).listen(8443, () => {
  console.log("Server listening on port 8000");
});
