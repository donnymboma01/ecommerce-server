import jwt from "jsonwebtoken";
import User from "../models/user.model";
import asyncHandler from "./asyncHandler";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read the jwt from 'jwt' cookie
  token = req.cookie.jwt;

  if (token) {
    try {
      const decoded = jw.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized , token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized , token failed.");
  }
});

// check for the Admin
const authorized = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as admin");
  }
};

export { authenticate, authorized };
