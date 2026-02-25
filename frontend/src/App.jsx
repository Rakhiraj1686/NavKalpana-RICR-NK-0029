import React, { useState } from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import UserDashboard from "./pages/dashboard/Userdashhboard";
import { Toaster } from "react-hot-toast";
import AiChatWidget from "./components/AiChatWidget";
import RoadmapPreview from "./pages/RoadmapPreview";
// import MonthlyReport from "./pages/MonthlyReport";



const App = () => {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Header openChat={() => setChatOpen(true)} />
        <AiChatWidget chatOpen={chatOpen} setChatOpen={setChatOpen} />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          {/* <Route path="/monthlyReport" element={<MonthlyReport />} /> */}
          < Route path="roadmapPreview" element={<RoadmapPreview/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
