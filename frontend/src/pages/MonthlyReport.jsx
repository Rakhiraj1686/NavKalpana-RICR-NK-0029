// import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../config/Api"
import { useEffect, useState } from "react";
import axios from "axios";


const MonthlyReport = ({ userId }) => {
  const [report, setReport] = useState(null);
  const month = "2026-02"; // dynamic kar sakti ho later
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("User:", user);
  console.log("User ID:", user?._id);

  console.log(userId);
  
  useEffect(() => {
    if (!user?._id) return;

    axios
      .get(`http://localhost:4500/reports/${user._id}/${month}`)
      .then(res => {
        console.log("API DATA:", res.data);
        setReport(res.data);
      })
      .catch(err => console.log(err));

  }, [month]);

  if (!report) {
    return <h2>No Report Found</h2>;
  }

  return (
    <div>
      <h2>Monthly Report</h2>
      <p>Weight Start: {report.weightStart}</p>
      <p>Weight End: {report.weightEnd}</p>
    </div>
  );
};

export default MonthlyReport;

//   if (!report) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center">
//         Monthly Fitness Report
//       </h2>

//       <div className="grid grid-cols-2 gap-6">
//         <Card title="Weight Change" value={`${report.weightChange} kg`} />
//         <Card title="Chest Change" value={`${report.chestChange} cm`} />
//         <Card title="Waist Change" value={`${report.waistChange} cm`} />
//         <Card title="Habit Score Avg" value={report.habitAvg.toFixed(2)} />
//         <Card
//           title="Workout Adherence"
//           value={`${report.workoutAdherence.toFixed(1)} %`}
//         />
//         <Card
//           title="Diet Adherence"
//           value={`${report.dietAdherence.toFixed(1)} %`}
//         />
//         <Card
//           title="Goal Progress"
//           value={`${report.goalProgress.toFixed(1)} %`}
//         />
//       </div>

//       <button className="mt-8 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//         Download Summary (Coming Soon)
//       </button>
//     </div>
//   );
// };

// const Card = ({ title, value }) => (
//   <div className="bg-white shadow-lg rounded-xl p-5 text-center">
//     <h3 className="text-lg font-semibold">{title}</h3>
//     <p className="text-2xl font-bold text-blue-600 mt-2">{value}</p>
//   </div>
// );

// export default MonthlyReport;