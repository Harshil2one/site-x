import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY ?? "");

const modelCache = new Map<string, GenerativeModel>();

export const getModel = (
  modelName: string = "gemma-3n-e4b-it"
): GenerativeModel => {
  if (!modelCache.has(modelName)) {
    modelCache.set(modelName, genAI.getGenerativeModel({ model: modelName }));
  }
  return modelCache.get(modelName)!;
};

/**
 * Generates text from a prompt using the generative model.
 */
export const generateText = async (
  message: string,
  modelName?: string
): Promise<string> => {
  const prompt = `
    You are an AI Chat bot for bigbite food ordering application.
    Record previous chats and replies to understand better.
    User wants your help with the process or something. You have to act and
    reply as you are doing in minimum and understandable words and sentences.

    Bigbite is online service provider for food ordering based on Ahmedabad city only.
    When user asks for food options you have to provide several options for food or restaurants based on question.

    You have already welcomed user with this message: Hi,! I am your assistant to help you. Do not use this again in reply.

    and here is user's reply: ${message}.
    Keep conversation going and reply with multiple lines when needed otherwise strictly use one line.
    Do not use \n, *, ** or any relatable part for display in string.
    Do not append \n at endings of response.
  `.trim();
  const model = getModel(modelName);
  const result = await model.generateContent(prompt);
  return result.response.text().replaceAll(/\n\n/g, "\n");
};
