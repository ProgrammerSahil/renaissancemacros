import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      height,
      currentWeight,
      activityLevel,
      weightGoal,
      dietaryRestrictions,
      foodAllergies,
    } = req.body;

    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      height,
      currentWeight,
      activityLevel,
      weightGoal,
      dietaryRestrictions,
      foodAllergies,
      weightHistory: [{ weight: currentWeight, date: new Date() }],
    });

    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    let bmr;
    if (gender === "male") {
      bmr = 88.362 + 13.397 * currentWeight + 4.799 * height - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * currentWeight + 3.098 * height - 4.33 * age;
    }

    const activityFactors = {
      sedentary: 1.2,
      "lightly active": 1.375,
      "moderately active": 1.55,
      "very active": 1.725,
      "extra active": 1.9,
    };
    const tdee = bmr * activityFactors[activityLevel];

    let calorieAdjustment = 0;
    if (weightGoal === "lose") calorieAdjustment = -500;
    if (weightGoal === "gain") calorieAdjustment = 500;

    newUser.bmr = Math.round(bmr);
    newUser.tdee = Math.round(tdee);
    newUser.dailyCalorieTarget = Math.round(tdee + calorieAdjustment);

    newUser.macroTargets = {
      protein: Math.round((newUser.dailyCalorieTarget * 0.3) / 4),
      carbs: Math.round((newUser.dailyCalorieTarget * 0.4) / 4),
      fats: Math.round((newUser.dailyCalorieTarget * 0.3) / 9),
    };

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Wrong email" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey);

    res.status(200).json({
      message: "Authentication successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        height: user.height,
        currentWeight: user.currentWeight,
        activityLevel: user.activityLevel,
        weightGoal: user.weightGoal,
        dietaryRestrictions: user.dietaryRestrictions,
        foodAllergies: user.foodAllergies,
      },
    });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res
      .status(500)
      .json({ message: "Error authenticating user", error: error.message });
  }
};
const findUserProfile = async (req, res) => {
  console.log("Profile endpoint reached");
  try {
    const user = req.user;
    res.status(200).json({
      message: "user profile found",
      userData: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        height: user.height,
        currentWeight: user.currentWeight,
        weightHistory: user.weightHistory,
        bmr: user.bmr,
        dailyCalorieTarget: user.dailyCalorieTarget,
        weightGoal: user.weightGoal,
        macroTargets: user.macroTargets,
        tdee: user.tdee,
        dietaryRestrictions: user.dietaryRestrictions,
        foodAllergies: user.foodAllergies,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { createUser, authenticateUser, findUserProfile };
