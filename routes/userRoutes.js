import express from "express";
import {
  createUser,
  getAllUsers,
  getCurrentUserProfile,
  loginUser,
  logoutCurrentUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { authenticate, authorized } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUser).get(authenticate, authorized, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateUserProfile);

export default router;
