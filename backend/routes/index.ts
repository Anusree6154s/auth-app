import express from "express";
import jwtRoutes from "./jwt.routes";
import oauthRoutes from "./oauth.routes";
import passwordlessRoutes from "./passwordless.routes";
// import mututalTLSRoutes from "./mutual-tls.routes";

const router = express.Router();

router.use("/oauth", oauthRoutes);
router.use("/jwt", jwtRoutes);
router.use("/passwordless", passwordlessRoutes);
// router.use("/mutual-tls", mututalTLSRoutes);

export default router;
