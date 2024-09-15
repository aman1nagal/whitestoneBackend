const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes by checking for a valid JWT token
exports.protect = async (req, res, next) => {
  // Retrieve token from Authorization header (formatted as: "Bearer <token>")
  const token = req.header("Authorization")?.split(" ")[1];

  // If no token is provided, deny access
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization denied, no token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user details to req object
    req.user = await User.findById(decoded.id);

    // If user is not found, deny access
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    // If token is invalid or expired, deny access
    return res
      .status(401)
      .json({ message: "Authorization denied, invalid token" });
  }
};

// exports.protect = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token == null)
//     return res.status(401).json({ status: "401", error: "Unauthorized" });
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err)
//       return res.status(403).json({ status: "403", error: "Token Not Valid" });
//     next();
//   });
// };
