import { reginaProvider } from "../providers/reginaProvider.js";

export const generateResponse = async (message, history = []) => {
  const response = await reginaProvider(message, history);

  return response.reply;
};