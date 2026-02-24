import React, { useState } from "react";
// import DietForm from "./components/DietForm";
// import DietResult from "./components/DietResult";
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
import WorkoutPlan from "./pages/WorkoutPlan";

{/* <Route path="/workout" element={<WorkoutPlan />} /> */}


const App = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [dietData, setDietData] = useState(null);

  return (
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
        {/* <div className="min-h-screen bg-gray-100">
          <Header />
          <div className="container mx-auto p-6">
            <DietForm setDietData={setDietData} />
            {dietData && <DietResult dietData={dietData} />}
          </div>
        </div> */}


      </Routes>
    </BrowserRouter>
  );
};

export default App;