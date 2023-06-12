import express from "express";

import auth from "./auth";
import user from "./user";
import { authMiddleware } from "../middlewares";
import MessageResponse from "../interfaces/MessageResponse";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/auth", auth);
router.use("/user", authMiddleware, user);

export default router;
