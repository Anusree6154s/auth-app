"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionOptions = void 0;
// import  connectRedis from "connect-redis"; // use version 6 to avoid errors
const constants_1 = require("../config/constants");
// import { redisClient } from "../redis/redisClient";
// import session from "express-session";
// const redisStore = connectRedis(session);
exports.sessionOptions = {
    //   store: new redisStore({
    //     client: redisClient as unknown as connectRedis.Client,
    //   }),
    // here redisClient is of type _redisClient..(smthg)
    // but Redis Store expects type Client.
    // therefore we type it as Client
    // (it doesnt hurt the code)
    secret: constants_1.session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24, // 24 hours in milliseconds
        httpOnly: false, // lets client-side JS access the cookie,
        secure: true, //allows cookie transfer ony on https
    },
};
