import express from "express";
import { loginUser } from "../controllers/auth";

const router = express.Router();

router.post("/login", loginUser);

module.exports = router;
