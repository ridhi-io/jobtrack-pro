const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // Check Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get Token
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Save User ID inside request
      req.user = decoded.id;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Invalid token.",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided.",
    });
  }
};

module.exports = protect;