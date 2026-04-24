const { GoogleGenAI } = require("@google/genai");
require("dotenv").config()

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey:process.env.google_secret_key});

async function main2(title) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: title,
  });
  return response.text
}

module.exports = {
    main2
}