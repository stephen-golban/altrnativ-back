import axios from "axios";
import { Router, Response, Request } from "express";

const router = Router();

router.get("/me", async (req: any, res: Response) => {
  try {
    const user = req.user;

    // Don't send back the password hash
    delete user.password;

    // Don't send back the password hash
    delete user.password;
    return res.status(201).json({ data: { user } });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/news", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("https://saurav.tech/NewsAPI");
    if (!response.data) {
      return res
        .status(400)
        .json({ message: "Something went wrong retrieving the news." });
    }
    return res.status(201).json({ data: { news: response.data } });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
