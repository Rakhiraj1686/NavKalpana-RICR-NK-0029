import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";

const Contact = () => {
  const [contactData, setContactData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleClear = () => {
    setContactData({
      fullName: "",
      email: "",
      message: "",
    });
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const submitContact = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Contact Data", contactData);
      toast.success("Message sent successfully");
      handleClear();
    } catch (error) {
      console.log(error);
      toast.error("Error in sendng message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-(--color-background) text-white min-h-screen px-6 md:px-16 py-20">
      {/* Heading */}

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl text-(--color-secondary) font-bold mb-4">
          Contact Us
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Have questions, suggestions, or collaboration ideas? Reach out to the
          HealthUP team.
        </p>
      </div>

      {/* Contact Grid */}

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}

        <div className="bg-(--color-primary) p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-(--color-accent)">
            Get in Touch
          </h2>

          <p className="mb-4 text-gray-300">📧 Email: support@healthup.com</p>

          <p className="mb-4 text-gray-300">🌐 GitHub: github.com/your-repo</p>

          <p className="text-gray-300">📍 Location : India</p>
        </div>

        {/* Contact Form */}

        <div className="bg-(--color-primary) p-8 rounded-lg shadow-lg">
          <form
            className="flex flex-col gap-5"
            onSubmit={submitContact}
            onReset={handleClear}
          >
            <input
              type="text"
              name="fullName"
              placeholder="Enter your name"
              value={contactData.fullName}
              onChange={handleChange}
              disabled={isLoading}
              required
              className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
            />

            <input
              type="text"
              name="email"
              placeholder="xyz123@example.com"
              value={contactData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
              className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
            />

            <textarea
              name="message"
              value={contactData.message}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Explain your query in detail..."
              rows="4"
              className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
            ></textarea>

            <button
              type="submit"
              className="bg-(--color-accent) py-3 rounded-md hover:opacity-90 transition cursor-pointer flex items-center gap-2 justify-center"
            >
              <FiSend />
              <span> Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
