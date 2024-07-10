import userModel from "../models/userModel.js";
import fs from "fs";
import mealModel from "../models/mealModel.js";
import dotenv from "dotenv";
import axios from "axios";
import { createClient } from "pexels";

dotenv.config();

const PEXELS_KEY = process.env.PEXELS_API_KEY;
const spoonacularKEY = process.env.spoonacularKEY;
const spoonacularURL = "https://api.spoonacular.com/recipes/guessNutrition";

const client = createClient(`${PEXELS_KEY}`);

const getMacros = async (req, res) => {
  try {
    const { title } = req.query;
    const response = await axios.get(
      `${spoonacularURL}?apiKey=${spoonacularKEY}&title=${title}`
    );
    res.status(200).json(response.data);
  } catch (e) {
    console.error("Error getting macros:", e);
    res.status(500).json({ message: "Server error" });
  }
};

const addMeal = async (req, res) => {
  try {
    const {
      email,
      name,
      totalCarbs,
      totalCalories,
      totalFats,
      totalProteins,
      components,
    } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let mealDoc = await mealModel.findOne({ userId: user._id });

    if (!mealDoc) {
      // If no meal document exists, create a new one
      mealDoc = new mealModel({
        userId: user._id,
        meals: [],
      });
    }

    // Create the new meal
    const newMeal = {
      name,
      totalCarbs,
      totalCalories,
      totalFats,
      totalProteins,
      components,
      date: new Date(),
    };

    // Add the new meal to the meals array
    mealDoc.meals.push(newMeal);

    // Save the updated meal document
    await mealDoc.save();

    res.status(201).json({
      message: "Meal added successfully",
      meal: newMeal,
    });
  } catch (error) {
    console.error("Error adding meal:", error);
    res
      .status(500)
      .json({ message: "Error adding meal", error: error.message });
  }
};

const getMeals = async (req, res) => {
  try {
    // Extract email from request
    const email = req.email;

    // Find the meal document associated with the email
    const mealDoc = await mealModel.findOne({ email: email });

    // If no meal document is found, return a 404 error
    if (!mealDoc) {
      return res.status(404).json({ message: "User meals not found" });
    }

    // Return the meals with a 200 status
    res.status(200).json({
      message: "User meals found",
      meals: mealDoc.meals,
    });
  } catch (error) {
    // Log any errors that occur and return a 500 error
    console.error("Error getting meals:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { getMacros, addMeal, getMeals };
