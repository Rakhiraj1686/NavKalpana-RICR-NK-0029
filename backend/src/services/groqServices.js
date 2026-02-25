import groq from "../config/groq.js";

export const getAIResponse = async (prompt) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `
            You are a structured fitness AI assistant.
            If user data exists:
            → Give direct advice.

            If missing:
            → Ask only missing info.

            Never repeat onboarding.
            Keep answers concise.`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content;
};
