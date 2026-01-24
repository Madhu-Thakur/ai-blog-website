import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getReadability(text) {
  if (!text || text.trim() === "") return "No content to analyze";

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Analyze the readability of the following text. Provide a concise assessment including:
1. Overall reading level (e.g., elementary, middle school, high school, college level)
2. Key factors affecting readability (sentence complexity, vocabulary difficulty, etc.)
3. A brief recommendation for improvement if needed

Text to analyze:
${text}

Please keep your response to 2-3 sentences.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Error analyzing readability:", error);
    return "Failed to analyze readability. Please try again.";
  }
}
