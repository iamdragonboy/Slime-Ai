import axios from "axios";

export async function groq(prompt) {
  const r = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "mixtral-8x7b",
      messages: [{ role: "user", content: prompt }]
    },
    { headers: { Authorization: `Bearer ${process.env.GROQ_KEY}` } }
  );
  return r.data.choices[0].message.content;
}
