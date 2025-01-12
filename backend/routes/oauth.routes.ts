import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/facebook", passport.authenticate("facebook"));
router.get("/twitter", passport.authenticate("twitter"));
router.get("/github", passport.authenticate("github"));

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/pages/authenticated",
    failureRedirect: "/pages/failed",
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/pages/authenticated",
    failureRedirect: "/pages/failed",
  })
);

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "/pages/authenticated",
    failureRedirect: "/pages/failed",
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/pages/authenticated",
    failureRedirect: "/pages/failed",
  })
);

router.get("/check-auth", (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated() });
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Failed to log out" });
    else res.json({ isLoggedOut: true });
  });
});

export default router;
