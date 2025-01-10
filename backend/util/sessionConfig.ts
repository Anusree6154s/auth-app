// import  connectRedis from "connect-redis"; // use version 6 to avoid errors
import { session_secret } from "../config/constants";
// import { redisClient } from "../redis/redisClient";
// import session from "express-session";

// const redisStore = connectRedis(session);
export const sessionOptions = {
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
    maxAge: 1000 * 60 * 60 * 24, // 24 hours in milliseconds
    secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
    httpOnly: true, // Prevents client-side JS from accessing the cookie
  },
};
