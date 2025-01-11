import { Router } from "express";
import educationRoutes from "./educationRoutes.js"
import profileRoutes from "./profileRoutes.js"
import skillsRoutes from "./skillsRoutes.js"
import cvAssetRoutes from "./cvAssetRoutes.js"
import requireAuth from "../middlewares/requireAuth.js";

const router = Router()

// Ensure User is authorized to access routes below
router.use(requireAuth)

// Education routes
router.use("/education", educationRoutes)

// Profile Routes
router.use("/profile", profileRoutes)

// Skills Routes
router.use("/skill", skillsRoutes)

// CvBlocks Routes
router.use("/cvasset", cvAssetRoutes)

export default router
