import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import passport from "passport";

import path from "path";
import { session_secret } from "./config/constants";
import authRoutes from "./routes";
import configurePassport from "./util/passportConfig";

const app = express();

app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours in milliseconds
    },
  })
); // Configure session middleware
app.use(passport.initialize()); //iniitlaise passport
app.use(passport.session()); //initalise sessions for cookie mgmt

configurePassport(); //passport config

app.use("/auth", authRoutes); //routes
app.use("/", (_, res) =>
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
);

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
