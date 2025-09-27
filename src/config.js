import { GoogleGenAI } from "@google/genai";
const API_BASE_URL = "http://localhost:5000";

export const ai = new GoogleGenAI({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY, 
});

export default API_BASE_URL;
