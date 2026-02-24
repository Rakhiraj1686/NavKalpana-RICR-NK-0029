import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserDiet = () => {
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiList, setAiList] = useState([]);

  const [form, setForm] = useState({
    name: "",
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  const [diets, setDiets] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/diet/create",
        form
      );
      toast.success("Diet Added Successfully ✅");
      setForm({ name: "", breakfast: "", lunch: "", dinner: "" });
      fetchDiets();
    } catch (error) {
      toast.error("Something went wrong ❌");
    }
  };

  const fetchDiets = async () => {
    const res = await axios.get("http://localhost:5000/api/diet/all");
    setDiets(res.data.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/diet/${id}`);
    toast.success("Deleted Successfully");
    fetchDiets();
  };

  const getSuggestion = async (type) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/suggest",
        { type }
      );
      setAiList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDiets();
  }, []);

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Add Diet Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Add Diet Plan
          </h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Name"
              onChange={handleChange}
              className="bg-white/10 p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex gap-3">
              <input
                type="text"
                name="breakfast"
                value={form.breakfast}
                placeholder="Breakfast"
                onChange={handleChange}
                className="flex-1 bg-white/10 p-3 rounded-lg"
              />
              <button
                type="button"
                onClick={() => getSuggestion("breakfast")}
                className="bg-purple-500 px-4 rounded-lg"
              >
                AI
              </button>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                name="lunch"
                value={form.lunch}
                placeholder="lunch"
                onChange={handleChange}
                className="flex-1 bg-white/10 p-3 rounded-lg"
              />
              <button
                type="button"
                onClick={() => getSuggestion("lunch")}
                className="bg-purple-500 px-4 rounded-lg"
              >
                AI
              </button>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                name="dinner"
                value={form.dinner}
                placeholder="dinner"
                onChange={handleChange}
                className="flex-1 bg-white/10 p-3 rounded-lg"
              />
              <button
                type="button"
                onClick={() => getSuggestion("dinner")}
                className="bg-purple-500 px-4 rounded-lg"
              >
                AI
              </button>
            </div>

            <button
              type="submit"
              className="md:col-span-2 bg-linear-to-r from-purple-500 to-blue-500 py-3 rounded-xl hover:scale-105 transition cursor-pointer"
            >
              Add Diet
            </button>
          </form>
          {loading && <p className="text-purple-400 mt-4">Generating suggestions...</p>}

          {suggestions && (
            <div className="mt-4 bg-white/10 p-4 rounded-lg whitespace-pre-line">
              {suggestions}
            </div>
          )}
        </div>

        {/* Diet List */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
          <h3 className="text-xl font-bold mb-6 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Diet Plans
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {diets.map((diet) => (
              <div
                key={diet._id}
                className="bg-white/10 p-5 rounded-xl space-y-2"
              >
                <h4 className="text-lg font-semibold text-purple-300">
                  {diet.name}
                </h4>
                <p>🍳 {diet.breakfast}</p>
                <p>🍛 {diet.lunch}</p>
                <p>🌙 {diet.dinner}</p>

                <button
                  onClick={() => handleDelete(diet._id)}
                  className="mt-3 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDiet;