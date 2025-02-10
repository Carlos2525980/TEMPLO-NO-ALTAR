


import express from "express";
import {addUser, deleteUser, getUsers} from "../controllers/user.js";

const router = express.Router();


router.get("/", getUsers)

router.post("/", addUser)

router.delete("/:id", deleteUser)

export default router