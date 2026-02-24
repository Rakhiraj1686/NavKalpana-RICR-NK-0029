import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ProgressGraph = ({ data }) => {
  return (
    <div className="bg-white/5 p-6 rounded-2xl mt-8">
      <h2 className="text-xl font-bold mb-6 text-white">
        Weekly Progress Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="week" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="workout" stroke="#8b5cf6" strokeWidth={3} />
          <Line type="monotone" dataKey="diet" stroke="#3b82f6" strokeWidth={3} />
          <Line type="monotone" dataKey="habit" stroke="#10b981" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressGraph;