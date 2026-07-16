const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} = require("../controllers/applicationController");

// Create
router.post("/", protect, createApplication);

// Read All
router.get("/", protect, getApplications);

// Read One
router.get("/:id", protect, getApplicationById);

// Update
router.put("/:id", protect, updateApplication);

// Delete
router.delete("/:id", protect, deleteApplication);

module.exports = router;