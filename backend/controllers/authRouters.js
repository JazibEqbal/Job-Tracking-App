import express from "express";
import { register, login, updateUser } from "./authController.js";
import auth from "../middleware/auth.js";
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 12,
  message: "Too many requests,please try again after few minutes",
});
//
const router = express.Router();
router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/updateUser").patch(auth, updateUser);

export default router;
