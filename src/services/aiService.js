import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const getSkillDescription = async (skillName) => {
    // 1. Check Caching (v2 for longer descriptions)
    const cacheKey = `skill_desc_v2_${skillName.toLowerCase().replace(/\s+/g, '_')}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        return JSON.parse(cachedData);
    }

    const modelsToTry = ["gemini-2.0-flash", "gemini-flash-latest", "gemini-2.5-flash"];
    let lastError = null;

    for (const modelName of modelsToTry) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });

            const prompt = `Actúa como un experto técnico senior e ingeniero de software. Proporciona una descripción teórica detallada y profesional para la habilidad técnica: "${skillName}". 
            
            Sigue exactamente esta estructura:
            1. Visión General Teórica: Escribe entre 2 y 3 párrafos profundos sobre la naturaleza, importancia y contexto de esta tecnología/habilidad.
            2. Pilares o Características Clave: Enumera exactamente 3 pilares clave. Para cada pilar, escribe un párrafo completo (3-4 frases) explicando su importancia y funcionamiento.
            
            Responde en español con un tono premium, educativo y técnico. El formato debe ser texto plano pero bien estructurado con saltos de línea claros. No uses markdown complejo como tablas o negritas exageradas, ya que se renderizará con whitespace-pre-line.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Store in Cache
            localStorage.setItem(cacheKey, JSON.stringify(text));

            return text;
        } catch (error) {
            console.warn(`Failed with model ${modelName}:`, error);
            lastError = error;
            // Continue to next model
        }
    }

    console.error("All AI models failed:", lastError);
    return "Lo sentimos, no pudimos generar la descripción para esta habilidad en este momento. Por favor, intenta de nuevo más tarde.";
};
