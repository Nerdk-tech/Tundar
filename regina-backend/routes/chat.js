import express from "express";
import { sendMessage } from "../controllers/chatController.js";
import { validateChatRequest } from "../validators/chatValidator.js";

const router = express.Router();

router.post("/", validateChatRequest, sendMessage);

export default router;