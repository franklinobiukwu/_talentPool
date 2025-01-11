import { Router } from "express";
import { createCvAsset } from "../controllers/cvAssetController.js";

const router = Router()

// Create CV Block
router.post("/", createCvAsset)
// Fetch CV Block
router.get("/", )
// Update CV Block
router.patch("/:cvAssetId",)
// Delete CV Block
router.delete("/:cvAssetId",)

export default router
