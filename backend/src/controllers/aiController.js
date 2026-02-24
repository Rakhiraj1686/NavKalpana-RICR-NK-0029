export const getDietSuggestion = async (req, res) => {
  const { type } = req.body;

  const suggestions = {
    breakfast: [
      "Oats with Fruits",
      "Boiled Eggs & Brown Bread",
      "Poha",
      "Upma",
      "Smoothie Bowl",
      "Sprouts Salad",
      "Paneer Sandwich",
      "Idli Sambar"
    ],
    lunch: [
      "Brown Rice + Dal",
      "Chapati + Mix Veg",
      "Grilled Chicken + Salad",
      "Rajma Chawal",
      "Paneer Curry",
      "Quinoa Bowl",
      "Khichdi",
      "Curd Rice"
    ],
    dinner: [
      "Vegetable Soup",
      "Grilled Fish",
      "Paneer Salad",
      "Boiled Vegetables",
      "Chicken Soup",
      "Oats Khichdi",
      "Light Dal + Roti",
      "Stir Fry Veggies"
    ]
  };

  res.status(200).json({
    success: true,
    data: suggestions[type] || []
  });
};