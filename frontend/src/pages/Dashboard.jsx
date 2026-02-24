import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;
    await axios.post("http://localhost:5000/api/tasks", {
      title,
      status: "Not Started",
      priority: "Medium",
    });
    setTitle("");
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { status });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Project Health Dashboard</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded w-80"
          placeholder="Enter Work Task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <div>
              <h2 className="font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-500">
                Status: {task.status} | Priority: {task.priority}
              </p>
            </div>

            <select
              className="border rounded p-1"
              value={task.status}
              onChange={(e) =>
                updateStatus(task._id, e.target.value)
              }
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;