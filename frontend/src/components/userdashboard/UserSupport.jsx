import React, { useState } from "react";
import HelpSection from "../help/HelpSection";

export default function Support() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [messages, setMessages] = useState([]);
  const [ticketType, setTicketType] = useState("Workout Issue");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketSuccess, setTicketSuccess] = useState(false);

  const handleTicketSubmit = () => {
    if (!ticketDescription.trim()) {
      alert("Please describe your issue.");
      return;
    }

    // Demo submission
    console.log("Ticket Submitted:", {
      type: ticketType,
      description: ticketDescription,
    });

    setTicketSuccess(true);
    setTicketDescription("");

    setTimeout(() => {
      setTicketSuccess(false);
    }, 3000);
  };

  const faqs = [
    {
      question: "Why did my calories change?",
      answer:
        "Your calorie target adjusts dynamically based on weight trends, adherence levels, metabolic adaptation, and goal progress. HealthUP AI recalibrates weekly to ensure safe, sustainable transformation.",
    },
    {
      question: "Why is my workout lighter this week?",
      answer:
        "Recent fatigue logs, low completion rate, or recovery indicators triggered an adaptive deload phase. HealthUP AI prioritizes long-term progression over short-term intensity.",
    },
    {
      question: "What is Habit Score?",
      answer:
        "Habit Score measures weekly behavioral consistency using Workout Adherence (60%) and Diet Adherence (40%). It predicts discipline patterns and potential drop-off risk.",
    },
    {
      question: "How does HealthUP AI prevent overtraining?",
      answer:
        "The system monitors fatigue frequency, completion rate, and progressive overload patterns. If recovery signals are detected, volume is reduced or structured recovery sessions are scheduled automatically.",
    },
    {
      question: "How is my goal timeline calculated?",
      answer:
        "Your projected timeline is based on realistic weekly fat loss or muscle gain rates. It updates dynamically using actual progress data rather than static estimates.",
    },
    {
      question: "Can I manually adjust my plan?",
      answer:
        "Yes. You can request modifications. However, HealthUP AI recommendations are data-driven and optimized for long-term sustainability and metabolic safety.",
    },
    {
      question: "Why is my protein intake higher than expected?",
      answer:
        "Protein is optimized to preserve lean muscle mass, enhance recovery, improve satiety, and maintain metabolic rate — especially during calorie deficits.",
    },
    {
      question: "What happens if I stop logging progress?",
      answer:
        "If no data is logged, the system detects inactivity risk. It may simplify your plan, reduce intensity, or send habit continuity reminders.",
    },
    {
      question: "How does HealthUP AI handle plateaus?",
      answer:
        "If weight or performance stagnates for multiple weeks, the system analyzes adherence, recovery, and calorie intake before adjusting macros, training load, or activity volume.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes. HealthUP AI uses encrypted authentication, secure token-based sessions, and protected database architecture to ensure user data privacy and integrity.",
    },
  ];
  // const handleSend = () => {
  //   if (!input.trim()) return;
  //   const newMessages = [
  //     ...messages,
  //     { type: "user", text: input },
  //     {
  //       type: "ai",
  //       text: "This is a demo AI response. Backend logic will analyze user data here.",
  //     },
  //   ];
  //   setMessages(newMessages);
  //   setInput("");
  // };

  const [input, setInput] = useState("");

  return (
    <div className="overflow-y-auto no-scrollbar text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Support & Help Center</h1>
        <p className="text-gray-400 mt-2">
          Need help with your fitness journey? We're here for you.
        </p>
        <div className="h-1 w-32 bg-linear-to-r from-purple-500 to-purple-700 mt-4 rounded-full"></div>
      </div>

      {/* help section */}
      
      <div className="mb-10">
        <HelpSection />
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
            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{faq.question}</h3>
              <span>{openFAQ === index ? "-" : "+"}</span>
            </div>
            {openFAQ === index && (
              <p className="text-gray-400 mt-3">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* AI Chat Section */}
      {/* <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6 mb-10">
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
                  msg.type === "user" ? "bg-purple-600" : "bg-gray-700"
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
          This AI provides general guidance only and does not replace medical
          advice.
        </p>
      </div> */}

      {/* Raise Ticket Section */}
      <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Raise a Support Ticket</h2>

        <select
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
          className="w-full bg-[#0F172A] border border-gray-600 rounded-xl px-4 py-2 mb-4"
        >
          <option>Workout Issue</option>
          <option>Diet Issue</option>
          <option>Technical Bug</option>
          <option>Other</option>
        </select>

        <textarea
          value={ticketDescription}
          onChange={(e) => setTicketDescription(e.target.value)}
          placeholder="Describe your issue..."
          className="w-full bg-[#0F172A] border border-gray-600 rounded-xl px-4 py-2 mb-4 h-28"
        ></textarea>

        <button
          onClick={handleTicketSubmit}
          className="w-full bg-linear-to-r from-purple-600 to-purple-800 py-2 rounded-xl hover:opacity-90 transition"
        >
          Submit Ticket
        </button>

        {ticketSuccess && (
          <p className="text-green-400 mt-3 text-sm">
            ✅ Your support ticket has been submitted successfully!
          </p>
        )}
      </div>
      {/* Disclaimer */}
      <div className="border border-red-600 bg-red-900/20 rounded-xl p-4 mb-6 text-sm text-red-300">
        ⚠ This platform provides general fitness guidance and does not replace
        professional medical advice. Always consult a healthcare professional
        before starting a new program.
      </div>
    </div>
  );
}
