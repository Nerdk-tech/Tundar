import crypto from "crypto";

const conversations = new Map();

export const saveMessage = (sessionId, role, message) => {
  if (!conversations.has(sessionId)) {
    conversations.set(sessionId, []);
  }

  conversations.get(sessionId).push({
    id: crypto.randomUUID(),
    role,
    message,
    timestamp: new Date().toISOString()
  });
};

export const getConversation = (sessionId) => {
  return conversations.get(sessionId) || [];
};

export const clearConversation = (sessionId) => {
  conversations.delete(sessionId);
};