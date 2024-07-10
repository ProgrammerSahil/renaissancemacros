import express from "express";
import { getMacros, addMeal, getMeals } from "../controllers/mealController.js";
import verifyToken from "../middleware/verifyToken.js";
const mealRouter = express.Router();

mealRouter.get("/getMacros", getMacros);
mealRouter.post("/addMeal", verifyToken, addMeal);
mealRouter.get("/getMeals", verifyToken, getMeals);

export default mealRouter;
