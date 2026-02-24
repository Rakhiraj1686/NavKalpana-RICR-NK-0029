export const generateAIPlan = (user) => {

  const baseCalories = Number(user.maintenanceCalories) || 1800;
  const weight = Number(user.weight) || 0;
  const goal = user.goal || "";

  let targetCalories = baseCalories;

  if (goal.toLowerCase() === "weight loss") {
    targetCalories -= 400;
  }

  if (goal.toLowerCase() === "muscle gain") {
    targetCalories += 300;
  }

  const protein = weight * 2;
  const fats = weight * 0.8;
  const carbs =
    weight > 0
      ? (targetCalories - (protein * 4 + fats * 9)) / 4
      : 0;

  return {
    calories: Math.round(targetCalories),
    macros: {
      protein: Math.max(0, Math.round(protein)),
      carbs: Math.max(0, Math.round(carbs)),
      fats: Math.max(0, Math.round(fats)),
    },
    workoutLevel: user.experienceLevel || "Beginner",
    generatedAt: new Date(),
  };
};