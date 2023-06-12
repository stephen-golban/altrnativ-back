import type { Db } from "mongodb";
import type { Request } from "express";

export default {
  port: 3000,
  jwt_secret: "altrnativ",
  db: {
    name: "test",
    url: "mongodb://mongo:3BZxkp1rJNDPK93NveZT@containers-us-west-64.railway.app:6058",
  },
};

export function get_db(req: Request) {
  const db = req.app.locals.db as Db;
  return db.collection("users");
}

export function generateSixDigitCode() {
  return Math.floor(Math.random() * 900000) + 100000;
}
