import { Router } from "express";
import {
    createCvAsset,
    deleteCvAsset,
    fetchCvAssets,
    fetchCvAsset,
    searchCvAssets,
    updateCvAsset } from "../controllers/cvAssetController.js";

const router = Router()

// Create a CV Asset
router.post("/", createCvAsset)
// Fetch All CV Assets
router.get("/", fetchCvAssets)
// Fetch a CV Asset
router.get("/:cvAssetId", fetchCvAsset)
// Update a CV Asset
router.patch("/:cvAssetId", updateCvAsset)
// Delete a CV Asset
router.delete("/:cvAssetId", deleteCvAsset)
// Search CV Assets
router.get("/search", searchCvAssets)

export default router
