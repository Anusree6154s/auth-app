"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get("/login", passport_1.default.authenticate("openidconnect"));
router.get("/callback", passport_1.default.authenticate("openidconnect", {
    successRedirect: "/pages/authenticated?title=OpenID Connect Auth",
    failureRedirect: "/pages/failed",
}));
router.get("/check-auth", (req, res) => {
    res.json({ isAuthenticated: req.isAuthenticated() });
});
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err)
            return res.status(500).json({ message: "Failed to log out" });
        else
            res.json({ isLoggedOut: true });
    });
});
exports.default = router;
