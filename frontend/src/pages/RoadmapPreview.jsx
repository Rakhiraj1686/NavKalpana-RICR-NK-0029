import React, { useEffect, useState } from "react";
import axios from "axios";

const RoadmapPreview = () => {
  const [roadmap, setRoadmap] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4500/api/roadmap/${userId}`
        );
        setRoadmap(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) fetchRoadmap();
  }, [userId]);

  if (!roadmap)
    return <div className="text-center mt-10">Loading roadmap...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Multi-Week Roadmap Preview
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {roadmap.plans.map((week) => (
          <div
            key={week.weekNumber}
            className="bg-white shadow-lg rounded-2xl p-6 border"
          >
            <h2 className="text-xl font-semibold mb-2">
              Week {week.weekNumber}
            </h2>

            <p className="mb-1">
              <span className="font-semibold">Intensity:</span>{" "}
              {week.intensityLevel}
            </p>

            <p className="mb-1">
              <span className="font-semibold">Workout Focus:</span>{" "}
              {week.workoutFocus}
            </p>

            <p className="mb-1">
              <span className="font-semibold">Diet Change:</span>{" "}
              {week.dietAdjustment}
            </p>

            <div className="mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full inline-block text-sm">
              🎯 {week.milestone}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapPreview;