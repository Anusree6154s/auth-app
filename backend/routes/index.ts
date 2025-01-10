import express from "express";
import basicauthRoutes from "./basicauth.routes";
import jwtRoutes from "./jwt.routes";
import oauthRoutes from "./oauth.routes";
import oidcsRoutes from "./oidc.routes";
import passwordlessRoutes from "./passwordless.routes";
import sessionRoutes from "./session.routes";
import mtlsRoutes from "./mtls.routes";

const router = express.Router();

router.use("/basicauth", basicauthRoutes);
router.use("/oauth", oauthRoutes);
router.use("/jwt", jwtRoutes);
router.use("/session", sessionRoutes);
router.use("/passwordless", passwordlessRoutes);
router.use("/oidc", oidcsRoutes);
router.use("/mtls", mtlsRoutes);

export default router;
