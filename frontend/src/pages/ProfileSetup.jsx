import { useState } from "react";
import api from "../config/Api";
import toast from "react-hot-toast";

export default function ProfileSetup() {
  const [form, setForm] = useState({
    age: "",
    biologicalSex: "",
    height: "",
    weight: "",
    activityLevel: "",
    experienceLevel: "",
    primaryGoal: "",
    goalWeight: "",
  });

  const [loading, setLoading] = useState(false);

  const filled = Object.values(form).filter(Boolean).length;
  const progress = Math.round((filled / 8) * 100);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.toLowerCase() });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await api.post("/health-profile", form);
      toast.success("Profile saved successfully 🚀");
    } catch (err) {
      console.error(err);
      toast.error("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-48 bg-linear-to-br from-[#020617] to-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Glow Background */}
      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -top-20 -left-20" />
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -bottom-20 -right-20" />

      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10 text-white relative z-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Complete Your Health Profile
          </h1>
          <p className="text-gray-400 mt-3">
            Let's personalize your HealthUP experience
          </p>
        </div>

        {/* Progress */}
        <div className="mb-10">
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-purple-500 to-blue-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-right text-sm text-gray-400 mt-2">
            {progress}% Completed
          </p>
        </div>

        {/* Input Style */}
        {/*
          Reusable style:
          bg-white/5 border border-white/10 px-4 py-3 rounded-xl
          focus:ring-2 focus:ring-purple-500 outline-none text-white
        */}

        {/* Age + Sex */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
            className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <select
            name="biologicalSex"
            onChange={handleChange}
            className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="" className="text-black">
              Biological Sex
            </option>
            <option value="male" className="text-black">
              Male
            </option>
            <option value="female" className="text-black">
              Female
            </option>
          </select>
        </div>

        {/* Height + Weight */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            onChange={handleChange}
            className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            onChange={handleChange}
            className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* Activity + Experience */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <select
            name="activityLevel"
            onChange={handleChange}
            className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="" className="text-black">
              Activity Level
            </option>
            <option value="sedentary" className="text-black">
              Sedentary
            </option>
            <option value="lightly active" className="text-black">
              Lightly Active
            </option>
            <option value="moderately active" className="text-black">
              Moderately Active
            </option>
            <option value="very active" className="text-black">
              Very Active
            </option>
          </select>

          <select
            name="experienceLevel"
            onChange={handleChange}
            className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl 
  focus:ring-2 focus:ring-purple-500 outline-none 
  text-white appearance-none"
          >
            <option value="" className="text-black">
              Experience Level
            </option>
            <option value="beginner" className="text-black">
              Beginner
            </option>
            <option value="intermediate" className="text-black">
              Intermediate
            </option>
            <option value="advanced" className="text-black">
              Advanced
            </option>
          </select>
        </div>

        {/* Goal */}
        <div className="mb-6">
          <select
            name="primaryGoal"
            onChange={handleChange}
            className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none w-full"
          >
            <option value="" className="text-black">
              Primary Goal
            </option>
            <option value="weight loss" className="text-black">
              Weight Loss
            </option>
            <option value="muscle gain" className="text-black">
              Muscle Gain
            </option>
            <option value="body recomposition" className="text-black">
              Body Recomposition
            </option>
            <option value="maintain" className="text-black">
              Maintain Fitness
            </option>
            <option value="improve endurance" className="text-black">
              Improve Endurance
            </option>
          </select>
        </div>

        {/* Goal Weight */}
        <div className="mb-8">
          <input
            type="number"
            name="goalWeight"
            placeholder="Target Weight (Optional)"
            onChange={handleChange}
            className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none w-full"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full cursor-pointer bg-linear-to-r from-purple-500 to-blue-500 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-lg"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
}
