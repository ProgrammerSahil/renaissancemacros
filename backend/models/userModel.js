import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: { type: String, enum: ["male", "female", "other"] },
  height: { type: Number, required: true }, // in cm
  currentWeight: { type: Number, required: true }, // in kg
  activityLevel: {
    type: String,
    enum: [
      "sedentary",
      "lightly active",
      "moderately active",
      "very active",
      "extra active",
    ],
    required: true,
  },
  weightGoal: {
    type: String,
    enum: ["lose", "gain", "maintain"],
    required: true,
  },
  bmr: Number,
  tdee: Number,
  dailyCalorieTarget: Number,
  macroTargets: {
    protein: Number,
    carbs: Number,
    fats: Number,
  },
  dietaryRestrictions: [String],
  foodAllergies: [String],
  weightHistory: [
    {
      weight: Number,
      date: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
