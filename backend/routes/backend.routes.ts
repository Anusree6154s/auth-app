import express from "express";
import oauthRoutes from "./oauth.routes";
import jwtRoutes from "./jwt.routes";

const router = express.Router();

router.use("/oauth", oauthRoutes);
router.use("/jwt", jwtRoutes);

export default router;
