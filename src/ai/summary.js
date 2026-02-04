import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateSummary(text) {
  if (!text || text.trim() === "") return "No content to summarize";

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `Please provide a concise summary of the following blog post in 2-3 sentences, capturing the main points and key ideas:

${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Failed to generate summary. Please try again.";
  }
}
