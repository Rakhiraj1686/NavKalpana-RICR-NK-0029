// import React, { useState } from "react";

// const DietForm = ({ setDietData }) => {
//   const [name, setName] = useState("");
//   const [goal, setGoal] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const result = {
//       name,
//       goal,
//       plan:
//         goal === "weightLoss"
//           ? "Eat high protein, low carb diet."
//           : "Eat calorie surplus with healthy foods.",
//     };

//     setDietData(result);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded shadow-md mb-6"
//     >
//       <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>

//       <input
//         type="text"
//         placeholder="Enter Name"
//         className="w-full p-2 border rounded mb-4"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />

//       <select
//         className="w-full p-2 border rounded mb-4"
//         value={goal}
//         onChange={(e) => setGoal(e.target.value)}
//         required
//       >
//         <option value="">Select Goal</option>
//         <option value="weightLoss">Weight Loss</option>
//         <option value="weightGain">Weight Gain</option>
//       </select>

//       <button
//         type="submit"
//         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//       >
//         Generate Plan
//       </button>
//     </form>
//   );
// };

// export default DietForm;