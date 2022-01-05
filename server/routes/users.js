import express from "express";
import {
  signIn,
  signUp,
  currentUser,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/current-user", currentUser);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
