import express, { Express, Request, Response } from "express";
import {
  getAllUsers,
  changePassword,
  createUser,
  deleteUser,
  getSingleUser,
  updateUser,
} from "../controller/usersController";

const router = express.Router();
router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.put("/changePassword/:id", changePassword);
router.delete("/:id", deleteUser);
export default router;
