import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        // The current SDK might not have a direct listModels but we can try to fetch the list via REST if needed
        // However, let's try a safer model name "gemini-1.5-flash" again but checking the exact SDK requirements
        console.log("Listing models is not directly supported via SDK in this way, let's check current documentation or try a different approach.");

        // Actually, let's try the common ones one by one with a script to see which one works
        const models = ["gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-1.5-pro", "gemini-2.0-flash-exp"];

        for (const m of models) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                const result = await model.generateContent("test");
                console.log(`Model ${m} WORKS!`);
                return;
            } catch (e) {
                console.log(`Model ${m} FAILED: ${e.message}`);
            }
        }
    } catch (error) {
        console.error("List test failed:", error);
    }
}

listModels();
