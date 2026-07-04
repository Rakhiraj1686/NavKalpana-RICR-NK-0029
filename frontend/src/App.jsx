import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import UserDashboard from "./pages/dashboard/Userdashhboard";
import AIChat from "./components/AiChatWidget";
import { Toaster } from "react-hot-toast";

function AppContent() {
  const location = useLocation();

  const hideHeader = location.pathname.startsWith("/user-dashboard");

  return (
    <>
      {!hideHeader && <Header />}

      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-dashboard/ai-chat" element={<AIChat />} />
      </Routes>
    </>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
