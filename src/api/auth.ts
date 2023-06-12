import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import configs, { generateSixDigitCode, get_db } from "../configs";

import express, { Request, Response } from "express";

const router = express.Router();
const secret = configs.jwt_secret;

router.post("/check-email", async (req: Request, res: Response) => {
  const users = get_db(req);

  const { email } = req.body;

  const user = await users.findOne({ email });
  if (user) {
    return res.status(403).json({
      message:
        "There is already an account registered with this email address.",
    });
  }

  return res.status(201).json({ data: { message: "success" } });
});

router.post("/check-phone", async (req: Request, res: Response) => {
  const users = get_db(req);

  const { phone_number } = req.body;

  const user = await users.findOne({ phone_number });
  if (user) {
    return res.status(403).json({
      message: "There is already an account registered with this phone number.",
    });
  }

  return res.status(201).json({ data: { code: generateSixDigitCode() } });
});

router.post("/resend-code", async (req: Request, res: Response) => {
  const users = get_db(req);

  const { phone_number } = req.body;

  const user = await users.findOne({ phone_number });
  if (user) {
    return res.status(403).json({
      message: "There is already an account registered with this phone number.",
    });
  }

  return res.status(201).json({ data: { code: generateSixDigitCode() } });
});

router.post("/register", async (req: Request, res: Response) => {
  const users = get_db(req);
  const {
    email,
    password,
    last_name,
    first_name,
    phone_number,
    abonnement_id,
  } = req.body;

  const hashed_pwd = await bcrypt.hash(password, 10);

  const user = {
    first_name,
    last_name,
    email,
    phone_number,
    abonnement_id,
    password: hashed_pwd,
  };

  users
    .insertOne(user)
    .then((data) =>
      res.status(201).json({
        data: { message: "Your account has been successfully created!" },
      })
    )
    .catch((error: any) => res.status(500).json({ error }));
});

router.post("/login", async (req: Request, res: Response) => {
  const users = get_db(req);

  const { email, password } = req.body;

  const user = await users.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "There is no account registered with this email address.",
    });
  }
  const is_correct_pwd = await bcrypt.compare(password, user.password);

  if (!is_correct_pwd) {
    return res.status(403).json({ message: "Incorrect password!" });
  }

  const token = jwt.sign({ sub: user._id }, secret, { expiresIn: "1h" });
  return res.status(201).json({ data: { token } });
});

export default router;
