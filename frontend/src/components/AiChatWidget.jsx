import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../config/Api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const AiChatWidget = ({ chatOpen, setChatOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLogin } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  // AI chat storage
  const storageKey =
    user && isLogin
      ? `healthup-ai-chat-${user._id}` // user specific
      : "healthup-ai-chat-guest"; // guest specific

  // Load chat history from storage
  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([]);
    }
  }, [storageKey]);

  /* Save chat history */
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey]);

  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);

    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      const welcome = [
        {
          role: "ai",
          text: "👋 Hi, I'm FitAI. Ask me anything about workouts, diet, nutrition, weight loss, muscle gain, or your health goals!",
        },
      ];

      setMessages(welcome);
      sessionStorage.setItem(storageKey, JSON.stringify(welcome));
    }
  }, [storageKey]);

  const detectType = (text) => {
    if (text.includes("workout")) return "WORKOUT_PLAN";
    if (text.includes("diet")) return "DIET_PLAN";
    if (text.includes("protein")) return "PROTEIN_RECOMMENDATION";
    return "PROGRESS_ANALYSIS";
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const messageText = input;
    const requestType = detectType(input);

    setMessages((prev) => [...prev, { role: "user", text: messageText }]);
    setInput("");
    setTyping(true);

    try {
      const endpoint = user && isLogin ? "/user/chat" : "/public/chat";

      const res = await api.post(endpoint, {
        type: requestType,
        userProfile: {
          age: user?.age,
          weight: user?.weight,
          height: user?.height,
          goal: user?.goal,
          experienceLevel: user?.experienceLevel,
        },
        message: messageText,
      });

      setMessages((prev) => [...prev, { role: "ai", text: res.data.reply }]);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 403) {
        if (user && isLogin) {
          toast.error(
            "Your free AI service for today is completed. Please upgrade.",
          );
        } else {
          toast.error("Please login or signup to access more.");
          setTimeout(() => navigate("/login"), 1200);
        }
        return;
      }
      toast.error("Something went wrong.");
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-[#020617] flex flex-col">
        {/* Header */}
        <div className="h-16 px-6 md:px-24 border-b border-white/10 bg-[#020617]/90 backdrop-blur-xl flex items-center justify-between ">
          <div>
            <h2 className="text-lg md:text-xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              FitAI Assistant
            </h2>
            <p className="text-xs text-gray-400">
              Your personal AI health coach
            </p>
          </div>

          <button
            onClick={() => navigate("/user-dashboard")}
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
          >
            ← Dashboard
          </button>
        </div>

        {/* Messages */}
        <div className="relative flex-1 overflow-y-auto px-4 md:px-28 py-6 no-scrollbar dashboard-scroll">
          {messages.length <= 1 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <img
                src={logo}
                alt="FitAI"
                className="w-24 h-24 md:w-32 md:h-32 object-contain mb-6"
              />

              <h2 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Welcome to FitAI
              </h2>

              <p className="mt-3 max-w-md text-gray-400 text-xs md:text-base">
                Your personal AI fitness coach. Ask anything about workouts,
                nutrition, weight loss, muscle gain, or healthy living.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`w-fit max-w-[80%] md:max-w-[40%] px-4 py-2 rounded-2xl text-sm md:text-base ${
                    msg.role === "user"
                      ? "ml-auto bg-linear-to-r from-cyan-500 to-blue-500 text-white"
                      : "bg-white/5 border border-white/10 text-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {typing && (
                <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 w-fit">
                  <p className="text-sm text-gray-400">FitAI is typing...</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Logo */}
        {messages.length > 1 ? (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <img
              src={logo}
              alt="FitAI"
              className="w-40 md:w-56 lg:w-64 opacity-[0.04] object-contain"
            />
          </div>
        ) : (
          ""
        )}

        {/* Disclaimer */}

        <div className="absolute bottom-18 left-1/2 -translate-x-1/2 z-0 pointer-events-none select-none">
          <p className="text-xs md:text-sm text-red-300 whitespace-nowrap  opacity-50">
            <span className="font-semibold">Medical Disclaimer:</span> FitAI can
            make mistakes.
          </p>
        </div>

        {/* Input */}
        <div className="border-t border-white/10 bg-[#020617] p-4">
          <div className="mx-auto flex items-center gap-3 max-w-5xl">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about workout, diet, nutrition, BMI..."
              className="flex-1 h-11 rounded-full border border-white/10 bg-white/5 px-5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
            <button
              onClick={sendMessage}
              className="h-11 min-w-22.5 rounded-full bg-linear-to-r from-purple-500 to-cyan-500 px-6 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AiChatWidget;
