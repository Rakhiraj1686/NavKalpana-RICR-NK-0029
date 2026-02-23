import React, { useState } from "react";

export default function Support() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [messages, setMessages] = useState([]);

  const faqs = [
    {
      question: "Why did my calories change?",
      answer:
        "Your calorie target adjusts based on your weight trend and adherence patterns.",
    },
    {
      question: "Why is my workout lighter this week?",
      answer:
        "High fatigue or low workout completion triggered recovery adjustment.",
    },
    {
      question: "What is Habit Score?",
      answer:
        "Habit Score is calculated using Workout (60%) and Diet adherence (40%).",
    },
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [
      ...messages,
      { type: "user", text: input },
      {
        type: "ai",
        text: "This is a demo AI response. Backend logic will analyze user data here.",
      },
    ];
    setMessages(newMessages);
    setInput("");
  };

  const [input, setInput] = useState("");

  return (
    <div className="bg-[#0B1120] min-h-screen text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Support & Help Center</h1>
        <p className="text-gray-400 mt-2">
          Need help with your fitness journey? We’re here for you.
        </p>
        <div className="h-1 w-32 bg-linear-to-r from-purple-500 to-purple-700 mt-4 rounded-full"></div>
      </div>

      {/* Quick Help Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {[
          "Habit Score Help",
          "Diet Plan Questions",
          "Workout Adjustments",
          "Technical Support",
        ].map((item, index) => (
          <div
            key={index}
            className="bg-[#111827] border border-gray-700 rounded-2xl p-6 hover:scale-105 transition duration-300 hover:border-purple-500"
          >
            <h3 className="text-lg font-semibold">{item}</h3>
            <p className="text-gray-400 text-sm mt-2">
              Click to learn more about {item.toLowerCase()}.
            </p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#111827] border border-gray-700 rounded-xl mb-4 p-5 cursor-pointer"
            onClick={() =>
              setOpenFAQ(openFAQ === index ? null : index)
            }
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{faq.question}</h3>
              <span>{openFAQ === index ? "−" : "+"}</span>
            </div>
            {openFAQ === index && (
              <p className="text-gray-400 mt-3">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* AI Chat Section */}
      <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Ask FitAI Support</h2>

        <div className="h-64 overflow-y-auto bg-[#0F172A] p-4 rounded-xl mb-4">
          {messages.length === 0 && (
            <p className="text-gray-500 text-sm">
              Ask something like: "Why is my weight not changing?"
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs ${
                  msg.type === "user"
                    ? "bg-purple-600"
                    : "bg-gray-700"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-[#0F172A] border border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleSend}
            className="bg-linear-to-r from-purple-600 to-purple-800 px-6 py-2 rounded-xl hover:opacity-90 transition"
          >
            Ask
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-3">
          This AI provides general guidance only and does not replace medical advice.
        </p>
      </div>

      {/* Raise Ticket Section */}
      <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Raise a Support Ticket</h2>

        <select className="w-full bg-[#0F172A] border border-gray-600 rounded-xl px-4 py-2 mb-4">
          <option>Workout Issue</option>
          <option>Diet Issue</option>
          <option>Technical Bug</option>
          <option>Other</option>
        </select>

        <textarea
          placeholder="Describe your issue..."
          className="w-full bg-[#0F172A] border border-gray-600 rounded-xl px-4 py-2 mb-4 h-28"
        ></textarea>

        <button className="w-full bg-linear-to-r from-purple-600 to-purple-800 py-2 rounded-xl hover:opacity-90 transition">
          Submit Ticket
        </button>
      </div>

      {/* Disclaimer */}
      <div className="border border-red-600 bg-red-900/20 rounded-xl p-4 text-sm text-red-300">
        ⚠ This platform provides general fitness guidance and does not replace
        professional medical advice. Always consult a healthcare professional
        before starting a new program.
      </div>
    </div>
  );
}