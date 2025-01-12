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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../config/constants");
const redisClient_1 = require("../redis/redisClient");
const router = express_1.default.Router();
router.post("/headers/signin", (req, res) => {
    const token = jsonwebtoken_1.default.sign({ username: req.body.username }, constants_1.jwt_secret, {
        expiresIn: "1h",
    });
    res.json({ token });
});
router.get("/headers/check-auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
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
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, constants_1.jwt_secret);
        // Attach decoded user information to the request
        req.user = decoded;
        res.json({ isAuthenticated: req.user ? true : false });
    }
    catch (error) {
        console.error("jwt headers verify error:", error);
        res.status(500).json({ error });
    }
}));
// Logout route
router.get("/headers/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
router.post("/cookies/signin", (req, res) => {
    const token = jsonwebtoken_1.default.sign({ username: req.body.username }, constants_1.jwt_secret, {
        expiresIn: "1h",
    });
    res.cookie("token", token);
    res.sendStatus(200);
});
router.get("/cookies/check-auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        res.json({ message: "Access denied. No token provided" });
        return;
    }
    const isBlacklisted = yield redisClient_1.redisClient.get(token || "");
    if (isBlacklisted) {
        res.json({ message: "Token is blacklisted" });
        return;
    }
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, constants_1.jwt_secret);
        // Attach decoded user information to the request
        req.user = decoded;
        res.json({ isAuthenticated: req.user ? true : false });
    }
    catch (error) {
        console.error("jwt cookies verify error:", error);
        res.status(500).json({ error });
    }
}));
// Logout route
router.get("/cookies/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (token) {
            // Blacklist the token in Redis
            yield redisClient_1.redisClient.set(token, "blacklisted", { EX: 3600 }); // 1-hour expiration
            console.log(`Token blacklisted: ${token}`);
        }
        res.clearCookie("token").json({ isLoggedOut: true });
    }
    catch (error) {
        console.error("jwt headers logout error:", error);
        res.status(500).json({ error });
    }
}));
exports.default = router;
