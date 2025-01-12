"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/login", (req, res) => {
    var _a;
    const { username } = req.body;
    if (!((_a = req.client) === null || _a === void 0 ? void 0 : _a.authorized)) {
        res
            .status(401)
            .json({ message: "Unauthorized: Client certificate required" });
        return;
    }
    req.session.user = { username };
    res.status(200).json({ message: "Login successful" });
});
router.get("/check-auth", (req, res) => {
    if (!req.session.user) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }
    res.status(200).json({
        isAuthenticated: true,
        user: req.session.user,
    });
});
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to log out" });
        }
        res
            .status(200)
            .json({ message: "Logged out successfully", isLoggedOut: true });
    });
});
exports.default = router;
