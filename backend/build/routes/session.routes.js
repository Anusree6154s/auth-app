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
const router = express_1.default.Router();
// In-memory user database (for simplicity)
const users = [];
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    if (!username) {
        res.status(400).json({ message: "Username is required" });
        return;
    }
    // Check if user already exists
    if (users.some((u) => u.username === username)) {
        res.status(400).json({ message: "User already exists" });
        return;
    }
    req.session.user = username;
    res.status(201).json({ message: "User created successfully" });
}));
// check existence of the session
router.get("/check-auth", (req, res) => {
    if (!req.session.user) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }
    res
        .status(200)
        .json({ message: "User is authenticated", isAuthenticated: true });
});
// Logout route: Destroy the session
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ message: "Failed to log out" });
            return;
        }
        res.status(200).json({ message: "Logout successful", isLoggedOut: true });
    });
});
exports.default = router;
