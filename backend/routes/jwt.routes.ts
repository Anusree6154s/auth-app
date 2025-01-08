import express from "express";
import passport from "passport";

const router = express.Router();

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/pages/authenticated.html",
    failureRedirect: "/pages/failed.html",
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/pages/authenticated.html",
    failureRedirect: "/pages/failed.html",
  })
);

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "/pages/authenticated.html",
    failureRedirect: "/pages/failed.html",
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/pages/authenticated.html",
    failureRedirect: "/pages/failed.html",
  })
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Failed to log out");
    res.redirect("/pages/authenticated.html");
  });
});

export default router;
