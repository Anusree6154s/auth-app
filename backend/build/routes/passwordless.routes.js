"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleapis_1 = require("googleapis");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const constants_1 = require("../config/constants");
const redisClient_1 = require("../redis/redisClient");
const OAuth2 = googleapis_1.google.auth.OAuth2;
const router = express_1.default.Router();
const createTransporter = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create an OAuth2 client
        const oauth2Client = new OAuth2(constants_1.google_client_id, constants_1.google_client_secret, "https://developers.google.com/oauthplayground");
        // Set the refresh token (you must have this from the first manual OAuth flow)
        oauth2Client.setCredentials({
            refresh_token: constants_1.google_refresh_token,
        });
        // Function to get a new access token using the refresh token
        const accessToken = yield oauth2Client.getAccessToken();
        // Create the transporter with the updated access token
        const transportOptions = {
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                user: constants_1.senders_gmail,
                clientId: constants_1.google_client_id,
                clientSecret: constants_1.google_client_secret,
                refreshToken: constants_1.google_refresh_token,
                accessToken: accessToken.token || undefined,
            },
        };
        const transporter = nodemailer_1.default.createTransport(transportOptions);
        return transporter;
    }
    catch (error) {
        console.error("Error creating transporter:", error);
        throw new Error("Failed to create email transporter");
    }
});
// Helper function to send email
function sendEmail(to, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = yield createTransporter();
        const mailOptions = {
            from: `"Auth Service" <${constants_1.senders_gmail}>`,
            to,
            subject: "Passwordless Authentication OTP",
            text: `Use the following OTP to log in: ${otp}`,
        };
        return transporter.sendMail(mailOptions);
    });
}
router.post("/sendOTP", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email)
        return res.status(400).send("Email is required");
    // Generate a one-time token
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP// Secure token
    const expirationTime = Date.now() + 10 * 60 * 1000; // 10 minutes expiration time
    try {
        // Send token via email
        yield sendEmail(email, otp);
        // Store the token and expiration time in Redis
        yield redisClient_1.redisClient.setEx(`auth:otp:${email}`, expirationTime, otp);
        res.status(200).send({ isOTPSent: true });
    }
    catch (error) {
        console.error("Error sending email", error);
        res.status(500).send("Error sending email or saving otp");
    }
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, OTP } = req.body;
    if (!email || !OTP) {
        return res.status(400).send("Email and token are required");
    }
    try {
        // Fetch the token from Redis
        const storedToken = yield redisClient_1.redisClient.get(`auth:otp:${email}`);
        if (!storedToken) {
            return res.status(400).send("No login request found for this email");
        }
        // Check if token matches
        if (storedToken === OTP) {
            // Delete the token from Redis after successful verification
            yield redisClient_1.redisClient.del(`auth:otp:${email}`);
            // Token is valid, create a JWT for the session (optional)
            const jwtToken = jsonwebtoken_1.default.sign({ email }, constants_1.jwt_secret, { expiresIn: "1h" });
            res
                .status(200)
                .send({ message: "Authentication successful", token: jwtToken });
        }
        else {
            res.status(400).send("Invalid or expired token");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error verifying token");
    }
}));
router.get("/check-auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (token === "Bearer") {
        res.json({ message: "Access denied. No token provided" });
        return;
    }
    const isBlacklisted = yield redisClient_1.redisClient.get(token || "");
    if (isBlacklisted) {
        res.json({ message: "Token is blacklisted" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, constants_1.jwt_secret);
        req.user = decoded;
        res.json({ isAuthenticated: req.user ? true : false });
    }
    catch (error) {
        console.error("jwt headers verify error:", error);
        res.status(500).json({ error });
    }
}));
// Logout route
router.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (token) {
            // Blacklist the token in Redis
            yield redisClient_1.redisClient.set(token, "blacklisted", { EX: 3600 }); // 1-hour expiration
            console.log(`Token blacklisted: ${token}`);
        }
        res.json({ isLoggedOut: true });
    }
    catch (error) {
        console.error("jwt headers logout error:", error);
        res.status(500).json({ error });
    }
}));
exports.default = router;
