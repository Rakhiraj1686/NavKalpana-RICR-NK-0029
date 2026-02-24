import { useEffect, useState } from "react";
import axios from "axios";

const WorkoutPlan = () => {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [workouts, setWorkouts] = useState([]);

  // Fetch workouts
  const fetchWorkouts = async () => {
    const res = await axios.get("http://localhost:4500/api/workout/all");
    setWorkouts(res.data);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Create workout
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:4500/api/workout/create", {
      userId: "123",
      title,
      day,
      exercises: [
        { name: "Pushups", sets: 3, reps: 15 },
        { name: "Squats", sets: 3, reps: 20 },
      ],
    });

    setTitle("");
    setDay("");
    fetchWorkouts();
  };

  // Delete workout
  const deleteWorkout = async (id) => {
    await axios.delete(`http://localhost:4500/api/workout/${id}`);
    fetchWorkouts();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Workout Plan
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
      >
        <input
          type="text"
          placeholder="Workout Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <input
          type="text"
          placeholder="Day (Monday, Tuesday...)"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Add Workout
        </button>
      </form>

      {/* Workout List */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {workouts.map((workout) => (
          <div
            key={workout._id}
            className="bg-white p-4 rounded shadow"
          >
            <h2 className="text-xl font-semibold">{workout.title}</h2>
            <p className="text-gray-500">Day: {workout.day}</p>

            <ul className="mt-2">
              {workout.exercises.map((ex, index) => (
                <li key={index} className="text-sm">
                  {ex.name} - {ex.sets} sets x {ex.reps} reps
                </li>
              ))}
            </ul>

            <button
              onClick={() => deleteWorkout(workout._id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlan;