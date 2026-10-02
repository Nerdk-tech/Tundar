import {
  saveMessage,
  getConversation
} from "../memory/chatMemory.js";
import { generateResponse } from "../services/aiService.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, sessionId = "default" } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required."
      });
    }

    saveMessage(sessionId, "user", message);

    const history = getConversation(sessionId);

    const reply = await generateResponse(message, history);

    saveMessage(sessionId, "assistant", reply);

    res.json({
      success: true,
      response: reply,
      history: getConversation(sessionId)
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
