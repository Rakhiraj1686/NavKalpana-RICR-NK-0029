import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";
import api from "../config/Api";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  const [contactData, setContactData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleClear = () => {
    setContactData({
      fullName: "",
      email: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const submitContact = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/public/contactMessage", contactData);
      console.log("Contact Data", contactData);
      toast.success(res.data.message);
      handleClear();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error sending message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-[#020617] to-[#0f172a] text-white py-32 px-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -top-20 -left-20" />
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -bottom-20 -right-20" />

        <div className="max-w-6xl mx-auto relative py-12 z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Let's Improve Health Together
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto">
              Questions, feedback, or collaboration ideas — HealthUP is always
              open to meaningful conversations that help build better health
              experiences for everyone.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Info Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl">
              <h2 className="text-xl font-semibold mb-6 text-purple-400">
                Connect With HealthUP
              </h2>

              {/* <p className="text-gray-300 mb-6 leading-relaxed">
                Whether you want to share feedback, discuss partnerships, report
                issues, or simply learn more about HealthUP — we're here to
                listen and respond quickly.
              </p> */}

              <p className="text-gray-300 mb-6 leading-relaxed">
                Whether you're exploring new features, facing a technical issue,
                or just curious about what we offer, our team is always ready to
                assist. We strive to provide prompt, friendly, and meaningful
                responses so you always feel supported throughout your journey
                with HealthUP.
              </p>

              <div className="space-y-4 text-gray-300">
                <p>📧 support@healthup.com</p>
                <p>🌐 healthup.netlify.com</p>
                <p>📍 XY, Ground Floor, Bhopal, MP</p>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl">
              <div>
                <div className="text-xl font-semibold mb-6 text-purple-400 ">
                  Get in Touch
                </div>
                <form
                  onSubmit={submitContact}
                  onReset={handleClear}
                  className="flex flex-col gap-6"
                >
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={contactData.fullName}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={contactData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400"
                  />

                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Your message..."
                    value={contactData.message}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400"
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-linear-to-r from-purple-500 to-blue-500 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-lg flex items-center justify-center gap-2"
                  >
                    <FiSend />
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Notes */}
      <footer className="bg-[#020617] text-white border-t border-white/10">
        <div className="border-t border-white/10 text-center py-6 text-gray-500 text-md">
          © {new Date().getFullYear()} HealthUP • All Rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Contact;
