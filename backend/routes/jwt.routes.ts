import express from "express";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/constants";
import { redisClient } from "../redis/redisClient";

const router = express.Router();

router.post("/headers/signin", (req, res) => {
  const token = jwt.sign({ username: req.body.username }, jwt_secret, {
    expiresIn: "1h",
  });

  res.json({ token });
});

router.get("/headers/check-auth", async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token === "Bearer") {
      res.json({ message: "Access denied. No token provided" });
      return;
    }

    const isBlacklisted = await redisClient.get(token || "");
    if (isBlacklisted) {
      res.json({ message: "Token is blacklisted" });
      return;
    }

    // Verify the token
    const decoded = jwt.verify(token!, jwt_secret) as { username: string };

    // Attach decoded user information to the request
    req.user = decoded;

    res.json({ isAuthenticated: req.user ? true : false });
  } catch (error) {
    console.error("jwt headers verify error:", error);
    res.status(500).json({ error });
  }
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
  const token = jwt.sign({ username: req.body.username }, jwt_secret, {
    expiresIn: "1h",
  });

  res.cookie("token", token);
  res.sendStatus(200);
});

router.get("/cookies/check-auth", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.json({ message: "Access denied. No token provided" });
    return;
  }

  const isBlacklisted = await redisClient.get(token || "");
  if (isBlacklisted) {
    res.json({ message: "Token is blacklisted" });
    return;
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwt_secret) as { username: string };

    // Attach decoded user information to the request
    req.user = decoded;

    res.json({ isAuthenticated: req.user ? true : false });
  } catch (error) {
    console.error("jwt cookies verify error:", error);
    res.status(500).json({ error });
  }
});

// Logout route
router.get("/cookies/logout", async (req, res) => {
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
