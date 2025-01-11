import { Router } from "express";
import { createCvAsset, deleteCvAsset, fetchCvAssets, updateCvAsset } from "../controllers/cvAssetController.js";

const router = Router()

// Create CV Block
router.post("/", createCvAsset)
// Fetch CV Block
router.get("/", fetchCvAssets)
// Update CV Block
router.patch("/:cvAssetId", updateCvAsset)
// Delete CV Block
router.delete("/:cvAssetId", deleteCvAsset)

export default router
