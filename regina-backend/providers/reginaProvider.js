export const reginaProvider = async (message, history = []) => {
  return {
    reply: `I received: "${message}". My AI engine will be connected soon.`,
    model: "regina-local-v1",
    historyLength: history.length
  };
};