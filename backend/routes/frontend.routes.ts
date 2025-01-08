import express from "express";

const router = express.Router();

router.get("/pages/oauth.html", (req, res, next) => {
  if (req.isAuthenticated()) res.redirect("/pages/authenticated.html");
  else next();
});

export default router;
