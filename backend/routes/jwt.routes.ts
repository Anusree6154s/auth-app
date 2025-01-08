import express, { NextFunction, Request, Response } from "express";
import { jwt_secret } from "../config/constants";
import { redisClient } from "../redis/redisClient";
const jwt = require("jsonwebtoken");

const router = express.Router();

// Google OAuth callback route
router.post("/headers/signin", (req, res) => {
  const token = jwt.sign({ username: req.body.username }, jwt_secret);

  res.json({ token });
});

const verifyJWTHeaders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    new Error("Access denied. No token provided");
    next();
  }

  const isBlacklisted = await redisClient.get(token || "");
  if (isBlacklisted) {
    new Error("Token is blacklisted");
    next();
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwt_secret) as { username: string };

    // Attach decoded user information to the request
    req.user = decoded;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("jwt headers verify error:", error);
    res.status(500).json({ error });
  }
};

router.get("/headers/check-auth", verifyJWTHeaders, (req, res) => {
  res.json({ isAuthenticated: req.user ? true : false });
});

// Logout route
router.get("/headers/logout", async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      // Blacklist the token in Redis
      await redisClient.set(token, "blacklisted", { EX: 3600 }); // 1-hour expiration
      console.log(`Token blacklisted: ${token}`);
    }

    res.json({ isLoggedOut: true });
  } catch (error) {
    console.error("jwt headers logout error:", error);
    res.status(500).json({ error });
  }
});

router.post("/cookies/signin", (req, res) => {
  console.log(req.body);
  const token = jwt.sign({ username: req.body.username }, jwt_secret);

  res.cookie("token", token);
  res.sendStatus(200);
});

const verifyJWTCookies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    new Error("Access denied. No token provided");
    next();
  }

  const isBlacklisted = await redisClient.get(token || "");
  if (isBlacklisted) {
    new Error("Token is blacklisted");
    next();
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwt_secret) as { username: string };

    // Attach decoded user information to the request
    req.user = decoded;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("jwt cookies verify error:", error);
    res.status(500).json({ error });
  }
};

router.get("/cookies/check-auth", verifyJWTCookies, (req, res) => {
  res.json({ isAuthenticated: req.user ? true : false });
});

// Logout route
router.get("/cookies/logout", async (req, res) => {
  console.log('called')
  try {
    const token = req.cookies.token;

    if (token) {
      // Blacklist the token in Redis
      await redisClient.set(token, "blacklisted", { EX: 3600 }); // 1-hour expiration
      console.log(`Token blacklisted: ${token}`);
    }

    res.clearCookie("token").json({ isLoggedOut: true });
  } catch (error) {
    console.error("jwt headers logout error:", error);
    res.status(500).json({ error });
  }
});

export default router;
