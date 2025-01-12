import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/login", passport.authenticate("openidconnect"));

router.get(
  "/callback",
  passport.authenticate("openidconnect", {
    successRedirect: "/pages/authenticated",
    failureRedirect: "/pages/failed",
  })
);

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
