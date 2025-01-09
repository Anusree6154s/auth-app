import express from "express";
import passport from "passport";
import { frontendUrl } from "../config/constants";

const router = express.Router();

router.get(
  "/login",
  (req, res, next) => {
    console.log("called");
    next();
  },
  passport.authenticate("openidconnect")
);

router.get("/callback", passport.authenticate("openidconnect"), (req, res) => {
  if (req.user) res.redirect(frontendUrl + "/pages/authenticated");
  else res.redirect(frontendUrl + "/pages/failed");
});

router.get("/check-auth", (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated() });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Failed to log out" });
    else res.json({ isLoggedOut: true });
  });
});

export default router;
