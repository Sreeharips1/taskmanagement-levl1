//mongodb connection logic

import mongoose from "mongoose";
import "dotenv/config";

const db = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("mongodb created successfully"))
    .catch((err) => console.log("failed to connect mongodb", err));
};

export default db;
