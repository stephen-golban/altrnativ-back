import Parser from "rss-parser";
import { Router, Response, Request } from "express";

const router = Router();

const parser = new Parser();

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
    const response = await parser.parseURL(
      "https://politepol.com/fd/dCNOKTPKFaiZ"
    );
    const mapped = response.items.map((item) => {
      return {
        title: item.title,
        actualite_url: item.link,
        image_uri: item.enclosure?.url,
      };
    });
    return res.status(201).json({ data: { news: mapped } });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
