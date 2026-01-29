import axios from "axios";

export async function ollama(prompt) {
  const r = await axios.post("http://localhost:11434/api/generate", {
    model: "llama3",
    prompt
  });
  return r.data.response;
}
