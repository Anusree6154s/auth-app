"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/facebook", passport_1.default.authenticate("facebook"));
router.get("/twitter", passport_1.default.authenticate("twitter"));
router.get("/github", passport_1.default.authenticate("github"));
// Google OAuth callback route
router.get("/google/callback", passport_1.default.authenticate("google", {
    successRedirect: "/pages/authenticated?title=Google Auth",
    failureRedirect: "/pages/failed",
}));
router.get("/facebook/callback", passport_1.default.authenticate("facebook", {
    successRedirect: "/pages/authenticated?title=Facebook Auth",
    failureRedirect: "/pages/failed",
}));
router.get("/twitter/callback", passport_1.default.authenticate("twitter", {
    successRedirect: "/pages/authenticated?title=Twitter Auth",
    failureRedirect: "/pages/failed",
}));
router.get("/github/callback", passport_1.default.authenticate("github", {
    successRedirect: "/pages/authenticated?title=Github Auth",
    failureRedirect: "/pages/failed",
}));
router.get("/check-auth", (req, res) => {
    res.json({ isAuthenticated: req.isAuthenticated() });
});
// Logout route
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err)
            return res.status(500).json({ message: "Failed to log out" });
        else
            res.json({ isLoggedOut: true });
    });
});
exports.default = router;
