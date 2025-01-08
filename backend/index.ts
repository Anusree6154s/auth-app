import cookieParser from 'cookie-parser';
import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "passport";
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

app.use('/auth',authRoutes); //routes
app.use(express.static("../frontend"));

app.listen(8000, () => console.log("Server running on http://localhost:8000"));
