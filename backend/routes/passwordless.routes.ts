import express, { NextFunction, Request, Response } from "express";
import { google } from "googleapis";
import jwt, { JwtPayload } from "jsonwebtoken";
import nodemailer from "nodemailer";
import {
  google_client_id,
  google_client_secret,
  google_refresh_token,
  jwt_secret,
  senders_gmail,
} from "../config/constants";
import { redisClient } from "../redis/redisClient";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const OAuth2 = google.auth.OAuth2;
const router = express.Router();

const createTransporter = async () => {
  try {
    // Create an OAuth2 client
    const oauth2Client = new OAuth2(
      google_client_id,
      google_client_secret,
      "https://developers.google.com/oauthplayground"
    );

    // Set the refresh token (you must have this from the first manual OAuth flow)
    oauth2Client.setCredentials({
      refresh_token: google_refresh_token,
    });

    // Function to get a new access token using the refresh token
    const accessToken = await oauth2Client.getAccessToken();

    // Create the transporter with the updated access token
    const transportOptions: SMTPTransport.Options = {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: senders_gmail,
        clientId: google_client_id,
        clientSecret: google_client_secret,
        refreshToken: google_refresh_token,
        accessToken: accessToken.token || undefined,
      },
    };
    const transporter = nodemailer.createTransport(transportOptions);

    return transporter;
  } catch (error) {
    console.error("Error creating transporter:", error);
    throw new Error("Failed to create email transporter");
  }
};

// Helper function to send email
async function sendEmail(to: string, otp: string) {
  const transporter = await createTransporter();
  const mailOptions = {
    from: `"Auth Service" <${senders_gmail}>`,
    to,
    subject: "Passwordless Authentication OTP",
    text: `Use the following OTP to log in: ${otp}`,
  };
  return transporter.sendMail(mailOptions);
}

router.post("/sendOTP", async (req: any, res: any) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Email is required");

  // Generate a one-time token
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP// Secure token
  const expirationTime = Date.now() + 10 * 60 * 1000; // 10 minutes expiration time

  try {
    // Send token via email
    await sendEmail(email, otp);

    // Store the token and expiration time in Redis
    await redisClient.setEx(`auth:otp:${email}`, expirationTime, otp);

    res.status(200).send({ isOTPSent: true });
  } catch (error) {
    console.error("Error sending email", error);
    res.status(500).send("Error sending email or saving otp");
  }
});

router.post("/signup", async (req: any, res: any) => {
  const { email, OTP } = req.body;

  if (!email || !OTP) {
    return res.status(400).send("Email and token are required");
  }

  try {
    // Fetch the token from Redis
    const storedToken = await redisClient.get(`auth:otp:${email}`);

    if (!storedToken) {
      return res.status(400).send("No login request found for this email");
    }

    // Check if token matches
    if (storedToken === OTP) {
      // Delete the token from Redis after successful verification
      await redisClient.del(`auth:otp:${email}`);

      // Token is valid, create a JWT for the session (optional)
      const jwtToken = jwt.sign({ email }, jwt_secret, { expiresIn: "1h" });

      res
        .status(200)
        .send({ message: "Authentication successful", token: jwtToken });
    } else {
      res.status(400).send("Invalid or expired token");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying token");
  }
});

const verifyPasswordlessAuth = async (
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
    const decoded = jwt.verify(token!, jwt_secret) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    console.error("jwt headers verify error:", error);
    res.status(500).json({ error });
  }
};

router.get("/check-auth", verifyPasswordlessAuth, (req, res) => {
  res.json({ isAuthenticated: req.user ? true : false });
});

// Logout route
router.get("/logout", async (req, res) => {
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


export default router;
