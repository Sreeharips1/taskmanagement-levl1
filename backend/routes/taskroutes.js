import express from "express";
import {
  newtask,
  gettasks,
  updatetask,
  deletetask,
} from "../controller/taskcontroller.js";

const router = express.Router();

//crete task
router.post("/tasks", newtask);

//get all

router.get("/tasks", gettasks);

//update

router.put("/tasks/:id", updatetask);

//del task

router.delete("/tasks/:id", deletetask);

export default router;
