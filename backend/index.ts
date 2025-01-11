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
import { frontendUrl, session_secret } from "./config/constants";

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
app.use(
  session({
    //   store: new redisStore({
    //     client: redisClient as unknown as connectRedis.Client,
    //   }),
    // here redisClient is of type _redisClient..(smthg)
    // but Redis Store expects type Client.
    // therefore we type it as Client
    // (it doesnt hurt the code)
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none", //rejects it unles secure true
      maxAge: 1000 * 60 * 60 * 24, // 24 hours in milliseconds
      secure: true, //allows cookie transfer only on https
      domain: '.onrender.com',
    },
  })
); // Configure session middleware
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
