import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import configs, { generateSixDigitCode } from "../configs";

import express, { Request, Response } from "express";
import User from "../models/user";

const router = express.Router();
const secret = configs.jwt_secret;

router.get("/test", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: "golban.stephen@gmail.com" });

    return res.status(201).json({ data: { message: "success", user } });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});
router.post("/check-email", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({
        message:
          "There is already an account registered with this email address.",
      });
    }

    return res.status(201).json({ data: { message: "success" } });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/check-phone", async (req: Request, res: Response) => {
  try {
    const { phone_number } = req.body;

    const user = await User.findOne({ phone_number });
    if (user) {
      return res.status(403).json({
        message:
          "There is already an account registered with this phone number.",
      });
    }

    return res.status(201).json({ data: { code: generateSixDigitCode() } });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/resend-code", async (req: Request, res: Response) => {
  try {
    const { phone_number } = req.body;

    const user = await User.findOne({ phone_number });
    if (user) {
      return res.status(403).json({
        message:
          "There is already an account registered with this phone number.",
      });
    }

    return res.status(201).json({ data: { code: generateSixDigitCode() } });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, ...rest } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({
        message:
          "There is already an account registered with this email address.",
      });
    }

    const hp = await bcrypt.hash(password, 12);
    const newAdmin = new User({ email, password: hp, ...rest });
    await newAdmin.save();

    return res.status(201).json({
      data: { message: "Your account has been successfully created!" },
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "There is no account registered with this email address.",
      });
    }
    const is_correct_pwd = await bcrypt.compare(password, user.password);

    if (!is_correct_pwd) {
      return res.status(403).json({ message: "Incorrect password!" });
    }

    const token = jwt.sign({ sub: user._id }, secret, { expiresIn: "7d" });
    return res.status(201).json({ data: { token } });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
