import express from "express";
import jwtRoutes from "./jwt.routes";
import oauthRoutes from "./oauth.routes";
import passwordlessRoutes from "./passwordless.routes";

const router = express.Router();

router.use("/oauth", oauthRoutes);
router.use("/jwt", jwtRoutes);
router.use("/passwordless", passwordlessRoutes);

export default router;
