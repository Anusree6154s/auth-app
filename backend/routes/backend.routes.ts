import express from "express";
import jwtRoutes from "./jwt.routes";
import oauthRoutes from "./oauth.routes";

const router = express.Router();

router.use("/oauth", oauthRoutes);
router.use("/jwt", jwtRoutes);

export default router;
