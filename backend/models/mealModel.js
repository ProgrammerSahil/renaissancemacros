import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String, required: true },

  meals: [
    {
      name: { type: String, required: true },
      totalCarbs: { type: Number, required: true },
      totalCalories: { type: Number, required: true },
      totalFats: { type: Number, required: true },
      quantity: { type: Number, required: true },
      totalProteins: { type: Number, required: true },
      components: [
        {
          name: { type: String, required: true },
          carbs: { type: Number, required: true },
          calories: { type: Number, required: true },
          fats: { type: Number, required: true },
          proteins: { type: Number, required: true },
          quantity: { type: Number, required: true },
        },
      ],
      date: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const mealModel = mongoose.model("Meal", mealSchema);
export default mealModel;
