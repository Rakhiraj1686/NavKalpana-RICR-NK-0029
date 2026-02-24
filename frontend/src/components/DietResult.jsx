import React from "react";

const DietResult = ({ dietData }) => {
  return (
    <div className="bg-green-100 p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Diet Plan</h2>
      <p><strong>Name:</strong> {dietData.name}</p>
      <p><strong>Goal:</strong> {dietData.goal}</p>
      <p className="mt-2 text-green-700">{dietData.plan}</p>
    </div>
  );
};

export default DietResult;