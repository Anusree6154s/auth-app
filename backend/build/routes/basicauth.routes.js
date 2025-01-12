"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const basic_auth_1 = __importDefault(require("basic-auth"));
const router = express_1.default.Router();
const users = [];
router.post("/signup", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Username and password are required" });
    }
    if (users.some((u) => u.username === username)) {
        return res.status(400).json({ message: "User already exists" });
    }
    users.push({ username, password });
    req.session.user = { username, password };
    res.status(201).json({ message: "User created successfully" });
});
const checkAuth = (req, res, next) => {
    const user = (0, basic_auth_1.default)(req); // Gets the username and password from the header
    if (!user || !user.name || !user.pass) {
        return res.status(401).json({ message: "Authentication required" });
    }
    const foundUser = users.find((u) => u.username === user.name && u.password === user.pass);
    if (!foundUser) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    next();
};
router.get("/check-auth", checkAuth, (req, res) => {
    var _a;
    res.status(200).json({
        message: "User is authenticated",
        isAuthenticated: ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) ? true : false,
    });
});
router.get("/logout", checkAuth, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).json({ message: "Could not log out" });
        }
        res.clearCookie("connect.sid"); // Clear session cookie
        res.status(200).json({ message: "Logout successful", isLoggedOut: true });
    });
});
exports.default = router;
