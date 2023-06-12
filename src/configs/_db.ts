import mongoose from "mongoose";

require("dotenv").config();

export const connect = mongoose.connect(process.env.DB_URL as string);
