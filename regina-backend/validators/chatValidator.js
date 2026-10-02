export const validateChatRequest = (req, res, next) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({
      success: false,
      message: "A valid message is required."
    });
  }

  if (message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Message cannot be empty."
    });
  }

  next();
};