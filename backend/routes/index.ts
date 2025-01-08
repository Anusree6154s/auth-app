import express from "express";
import backendRoutes from "./backend.routes";
import frontendRoutes from "./frontend.routes";

const router = express.Router();

router.use('/auth', backendRoutes);
router.use('/', frontendRoutes);

export default router;
