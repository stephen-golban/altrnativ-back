import configs from "./index";
import mongoose from "mongoose";

export const _db = async () => {
  return await mongoose
    .connect(configs.db.url, {
      autoIndex: true,
      dbName: configs.db.name,
    })
    .then(() => console.log("connected to DB!"));
};
