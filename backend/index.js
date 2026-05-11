import express from "express";
import cors from "cors";
import "dotenv/config";
import db from "./utils/db.js";
import router from "./routes/taskroutes.js";

const app = express();
const port = process.env.PORT || 5001;

//middleware

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//db connection
db();

//route setup

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`server is running on port : ${port}..`);
});
