const Application = require("../models/Application");

// ==========================
// Create Application
// ==========================
const createApplication = async (req, res) => {
  try {
    const {
      company,
      role,
      location,
      salary,
      status,
      applicationDate,
      interviewDate,
      jobLink,
      resumeLink,
      notes,
    } = req.body;

    if (!company || !role) {
      return res.status(400).json({
        success: false,
        message: "Company and Role are required",
      });
    }

    const application = await Application.create({
      user: req.user,
      company,
      role,
      location,
      salary,
      status,
      applicationDate,
      interviewDate,
      jobLink,
      resumeLink,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Application created successfully",
      application,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Get All Applications
// ==========================
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Get Single Application
// ==========================
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      application,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Update Application
// ==========================
const updateApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      application: updatedApplication,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Delete Application
// ==========================
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};