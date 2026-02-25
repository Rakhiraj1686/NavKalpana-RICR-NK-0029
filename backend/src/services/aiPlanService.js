const pickRandom = (items = [], count = 1) => {
  const copied = [...items];
  const selected = [];
  while (copied.length && selected.length < count) {
    const index = Math.floor(Math.random() * copied.length);
    selected.push(copied.splice(index, 1)[0]);
  }
  return selected;
};

const getMacroDistribution = (goal = "") => {
  const normalized = String(goal || "").toLowerCase();
  if (normalized.includes("weight") && normalized.includes("loss")) {
    return { protein: 0.4, carbs: 0.3, fats: 0.3 };
  }
  if (normalized.includes("muscle") && normalized.includes("gain")) {
    return { protein: 0.3, carbs: 0.5, fats: 0.2 };
  }
  return { protein: 0.3, carbs: 0.4, fats: 0.3 };
};

const getMealPool = (foodPreference = "") => {
  const vegetarianPool = {
    breakfast: [
      ["Oats + Peanut Butter", "Greek Yogurt", "Fruit"],
      ["Besan Chilla", "Paneer", "Green Tea"],
      ["Poha", "Boiled Sprouts", "Buttermilk"],
    ],
    lunch: [
      ["Dal", "Brown Rice", "Salad"],
      ["Paneer Bhurji", "Roti", "Cucumber Salad"],
      ["Rajma", "Rice", "Curd"],
    ],
    dinner: [
      ["Tofu Stir Fry", "Quinoa", "Soup"],
      ["Paneer Tikka", "Millet Roti", "Salad"],
      ["Moong Khichdi", "Curd", "Sauteed Veg"],
    ],
  };

  const nonVegPool = {
    breakfast: [
      ["Egg Omelette", "Whole Wheat Toast", "Fruit"],
      ["Oats", "Boiled Eggs", "Green Tea"],
      ["Chicken Sandwich", "Curd"],
    ],
    lunch: [
      ["Grilled Chicken", "Brown Rice", "Salad"],
      ["Fish Curry", "Rice", "Steamed Veg"],
      ["Chicken Bowl", "Quinoa", "Yogurt"],
    ],
    dinner: [
      ["Baked Fish", "Sweet Potato", "Salad"],
      ["Chicken Stir Fry", "Millet", "Soup"],
      ["Egg Curry", "Roti", "Veg Mix"],
    ],
  };

  const normalized = String(foodPreference || "").toLowerCase();
  if (normalized === "vegetarian" || normalized === "vegan") {
    return vegetarianPool;
  }
  return nonVegPool;
};

const buildMeals = ({ calories, macros, foodPreference }) => {
  const pool = getMealPool(foodPreference);
  const breakfast = pickRandom(pool.breakfast, 1)[0] || [];
  const lunch = pickRandom(pool.lunch, 1)[0] || [];
  const dinner = pickRandom(pool.dinner, 1)[0] || [];

  return [
    {
      mealName: "Breakfast",
      time: "7:00 AM - 8:00 AM",
      calories: Math.round(calories * 0.28),
      items: breakfast,
      macros: {
        protein: Math.round(macros.protein * 0.28),
        carbs: Math.round(macros.carbs * 0.28),
        fats: Math.round(macros.fats * 0.28),
      },
    },
    {
      mealName: "Lunch",
      time: "1:00 PM - 2:00 PM",
      calories: Math.round(calories * 0.37),
      items: lunch,
      macros: {
        protein: Math.round(macros.protein * 0.37),
        carbs: Math.round(macros.carbs * 0.37),
        fats: Math.round(macros.fats * 0.37),
      },
    },
    {
      mealName: "Dinner",
      time: "7:30 PM - 8:30 PM",
      calories: Math.round(calories * 0.35),
      items: dinner,
      macros: {
        protein: Math.round(macros.protein * 0.35),
        carbs: Math.round(macros.carbs * 0.35),
        fats: Math.round(macros.fats * 0.35),
      },
    },
  ];
};

const getWorkoutTemplate = (level = "beginner") => {
  const beginner = [
    { focus: "Upper Body", exercises: ["Push-ups", "Rows", "Shoulder Press"] },
    { focus: "Lower Body", exercises: ["Squats", "Lunges", "Glute Bridge"] },
    { focus: "Core + Mobility", exercises: ["Plank", "Dead Bug", "Stretching"] },
    { focus: "Cardio", exercises: ["Brisk Walk", "Cycling", "Step-ups"] },
    { focus: "Full Body", exercises: ["Bodyweight Circuit", "Burpees", "Mountain Climbers"] },
  ];

  const intermediate = [
    { focus: "Chest + Triceps", exercises: ["Bench Press", "Dips", "Cable Pushdown"] },
    { focus: "Back + Biceps", exercises: ["Rows", "Pull-down", "Hammer Curl"] },
    { focus: "Legs", exercises: ["Squat", "RDL", "Leg Press"] },
    { focus: "Shoulders + Core", exercises: ["Overhead Press", "Lateral Raise", "Plank"] },
    { focus: "Conditioning", exercises: ["HIIT Intervals", "Kettlebell Swings", "Jump Rope"] },
  ];

  const advanced = [
    { focus: "Push", exercises: ["Incline Press", "OHP", "Weighted Dips"] },
    { focus: "Pull", exercises: ["Deadlift", "Pull-ups", "Rows"] },
    { focus: "Leg Power", exercises: ["Front Squat", "Lunges", "Hip Thrust"] },
    { focus: "Hypertrophy", exercises: ["Accessory Circuit", "Supersets", "Core Finisher"] },
    { focus: "Athletic Conditioning", exercises: ["Sprint Intervals", "Sled Push", "Battle Rope"] },
  ];

  const normalized = String(level || "").toLowerCase();
  if (normalized === "advanced") return advanced;
  if (normalized === "intermediate") return intermediate;
  return beginner;
};

const buildWorkoutDays = ({ level, workoutsPerWeek, progressAdjustment }) => {
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const template = getWorkoutTemplate(level);
  const targetWorkoutDays = Math.max(3, Math.min(6, Number(workoutsPerWeek || 5) + progressAdjustment));

  return dayNames.map((dayName, index) => {
    if (index < targetWorkoutDays) {
      const selected = template[index % template.length];
      return {
        dayName,
        focus: selected.focus,
        duration: level === "beginner" ? "35-45 min" : "45-60 min",
        exercises: selected.exercises.map((name) => ({
          name,
          sets: level === "beginner" ? 3 : 4,
          reps: level === "advanced" ? "6-10" : "8-12",
          rest: level === "advanced" ? "90 sec" : "60 sec",
          formGuide: "Controlled movement with proper form",
        })),
      };
    }

    return {
      dayName,
      focus: "Recovery",
      duration: "20-30 min",
      exercises: [
        {
          name: "Light Walk + Stretch",
          sets: 1,
          reps: "20 min",
          rest: "N/A",
          formGuide: "Keep intensity low, focus on recovery",
        },
      ],
    };
  });
};

export const generateAIPlan = (user, progressSummary = null) => {
  const baseCalories = Number(user.maintenanceCalories) || Number(user.calorieTarget) || 1800;
  const weight = Number(user.weight) || 60;
  const goal = user.goal || user.primaryGoal || "maintain";
  const level = String(user.experienceLevel || "beginner").toLowerCase();

  let targetCalories = Number(user.targetCalories) || baseCalories;
  const normalizedGoal = String(goal).toLowerCase();

  if (!user.targetCalories) {
    if (normalizedGoal.includes("weight") && normalizedGoal.includes("loss")) {
      targetCalories -= 350;
    } else if (normalizedGoal.includes("muscle") && normalizedGoal.includes("gain")) {
      targetCalories += 250;
    }
  }

  let workoutAdjustment = 0;
  let calorieAdjustment = 0;

  if (progressSummary) {
    if (progressSummary.avgHabitScore >= 80) {
      workoutAdjustment = 1;
      calorieAdjustment = normalizedGoal.includes("loss") ? -80 : 80;
    } else if (progressSummary.avgHabitScore < 50) {
      workoutAdjustment = -1;
      calorieAdjustment = normalizedGoal.includes("loss") ? 100 : 0;
    }

    if (progressSummary.avgDietAdherence < 45 && normalizedGoal.includes("loss")) {
      calorieAdjustment += 70;
    }
  }

  targetCalories = Math.max(1200, Math.round(targetCalories + calorieAdjustment));

  const ratio = getMacroDistribution(goal);
  const protein = Math.max(0, Math.round((targetCalories * ratio.protein) / 4));
  const carbs = Math.max(0, Math.round((targetCalories * ratio.carbs) / 4));
  const fats = Math.max(0, Math.round((targetCalories * ratio.fats) / 9));

  const macros = { protein, carbs, fats };
  const meals = buildMeals({
    calories: targetCalories,
    macros,
    foodPreference: user.foodPreference,
  });

  const workoutsPerWeek = user.workoutsPerWeek || 5;
  const workoutDays = buildWorkoutDays({
    level,
    workoutsPerWeek,
    progressAdjustment: workoutAdjustment,
  });

  return {
    calories: targetCalories,
    macros,
    meals,
    workoutDays,
    workoutLevel: user.experienceLevel || "Beginner",
    progressInsights: {
      avgWorkoutAdherence: progressSummary?.avgWorkoutAdherence || 0,
      avgDietAdherence: progressSummary?.avgDietAdherence || 0,
      avgHabitScore: progressSummary?.avgHabitScore || 0,
      planMode: progressSummary ? "progress_adaptive" : "adaptive_random",
    },
    generatedAt: new Date(),
  };
};