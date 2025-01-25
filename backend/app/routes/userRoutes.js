import { Router } from "express";
import educationRoutes from "./educationRoutes.js"
import profileRoutes from "./profileRoutes.js"
import skillsRoutes from "./skillsRoutes.js"
import cvAssetsRoutes from "./cvAssetsRoutes.js"
import cvSectionsRoutes from "./cvSectionsRoutes.js"
import requireAuth from "../middlewares/requireAuth.js";

const router = Router()

// Ensure User is authorized to access routes below
router.use(requireAuth)

// Education routes
router.use("/education", educationRoutes)

// Profile Routes
router.use("/profile", profileRoutes)

// Skills Routes
router.use("/skills", skillsRoutes)

// CvBlocks Routes
router.use("/cvassets", cvAssetsRoutes)

// CV Sections Routes
router.use("/cvsections", cvSectionsRoutes)

export default router
