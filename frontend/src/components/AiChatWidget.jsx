import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../config/Api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const AiChatWidget = ({ chatOpen, setChatOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLogin } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  /* Load chat history */
  useEffect(() => {
    const saved = sessionStorage.getItem("healthup-ai-chat");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  /* Save chat history */
  useEffect(() => {
    sessionStorage.setItem("healthup-ai-chat", JSON.stringify(messages));
  }, [messages]);

  /* Welcome message when first opened */
  useEffect(() => {
    if (chatOpen && messages.length === 0) {
      setMessages([
        {
          role: "ai",
          text: "Hi, I'm FitAI. Ask me about health queries..",
        },
      ]);
    }
  }, [chatOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      if (user && isLogin) {
        const res = await api.post("/user/chat", {
          message: input,
        });
        setMessages((prev) => [...prev, { role: "ai", text: res.data.reply }]);
      } else {
        const res = await api.post("/public/chat", {
          message: input,
        });
        setMessages((prev) => [...prev, { role: "ai", text: res.data.reply }]);
      }
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("Free AI limit reached. Please login.");

        setTimeout(() => {
          navigate("/login");
        }, 1200);

        return;
      }
      toast.error("Something went wrong.");
    } finally {
      setInput("");
      setTyping(false);
    }
  };

  useEffect(() => {
    setChatOpen(false);
  }, [location]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        disabled={chatOpen}
        className={`fixed bottom-4 right-8 z-50 bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 text-white px-3 py-2 rounded-full shadow-2xl hover:bg-[#1e293b] transition-all duration-300  ${chatOpen ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        Ask FitAI
      </button>

      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-16 right-6 w-80 h-100 bg-[#020617]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between">
            <h3 className="text-white font-semibold">Chat with FitAI</h3>
            <button
              onClick={() => setChatOpen(false)}
              className="text-white cursor-pointer hover:text-red-500"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3  no-scrollbar ">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                  msg.role === "user"
                    ? "bg-blue-600 ml-auto text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {typing && <p className="text-gray-400 text-sm">AI is typing...</p>}
          </div>

          {/* Input */}
          <div className="p-2 border-t border-white/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about health..."
              className="flex-1 bg-[#0f172a] text-white px-6 py-2 rounded-full outline-none"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className="bg-linear-to-r from-purple-500 to-purple-600 cursor-pointer px-4 rounded-full text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AiChatWidget;
