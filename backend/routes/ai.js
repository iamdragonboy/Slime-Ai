import express from "express";
import { ollama } from "../services/ollama.js";
import { groq } from "../services/groq.js";

const r = express.Router();

r.post("/", async (req,res)=>{
  const { prompt, provider } = req.body;
  try {
    const ans = provider==="groq"
      ? await groq(prompt)
      : await ollama(prompt);
    res.json({ answer: ans });
  } catch {
    res.status(500).json({ error:"AI error" });
  }
});

export default r;
