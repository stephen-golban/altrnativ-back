import cors from "cors";
import express from "express";

import api from "./api";
import configs from "./configs";
import { _db } from "./configs/_db";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/v1", api);
app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.listen(configs.port, async () => {
  await _db();

  console.log(`Listening: http://localhost:${configs.port}`);
});

export default app;
