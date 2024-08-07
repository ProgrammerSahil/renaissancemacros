import React, { useState } from "react";
import axios from "axios";

const MealsPage = ({ userData }) => {
  const [search, setSearch] = useState("");
  const [mealName, setMealName] = useState("");
  const [mealData, setMealData] = useState(null);
  const [mealImage, setMealImage] = useState(null);
  const [currentFood, setCurrentFood] = useState("");
  const [quantity, setQuantity] = useState(100); // Default quantity in grams
  const [components, setComponents] = useState([]); // List of food components

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleMealNameChange = (e) => {
    setMealName(e.target.value);
  };

  const fetchMealData = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/meal/getMacros`,
        {
          params: { title: query },
        }
      );
      const imageResponse = await axios.get(
        `https://api.unsplash.com/search/photos/?client_id=aH_NfScFgR3t0nRZBQMEkAKituOklmoPbw6JwW2MXV0&query=${query}`
      );
      setMealData(response.data);
      setCurrentFood(search);
      const firstImage = imageResponse.data.results[0];
      setMealImage(firstImage ? firstImage.urls.small : null);
    } catch (error) {
      console.error("Error fetching meal data:", error);
      alert("Failed to fetch meal data. Please try again.");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMealData(search);
  };

  const handleAddMeal = () => {
    if (!mealData) {
      alert("Please search and select a food item.");
      return;
    }

    // Calculate the macros based on the quantity
    const totalCarbs = (mealData.carbs.value / 100) * quantity;
    const totalCalories = (mealData.calories.value / 100) * quantity;
    const totalFats = (mealData.fat.value / 100) * quantity;
    const totalProteins = (mealData.protein.value / 100) * quantity;

    // Add the new component to the list
    const newComponent = {
      name: search,
      quantity: quantity,
      carbs: totalCarbs,
      calories: totalCalories,
      fats: totalFats,
      proteins: totalProteins,
    };
    setComponents([...components, newComponent]);

    setSearch("");
    setMealData(null);
    setMealImage(null);
    setQuantity(100); // Reset quantity to default 100g
  };

  const handleSaveMeal = async () => {
    if (!mealName.trim()) {
      alert("Please enter a meal name.");
      return;
    }

    const totalCarbs = components.reduce((sum, item) => sum + item.carbs, 0);
    const totalCalories = components.reduce(
      (sum, item) => sum + item.calories,
      0
    );

    const totalQuantity = components.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalFats = components.reduce((sum, item) => sum + item.fats, 0);
    const totalProteins = components.reduce(
      (sum, item) => sum + item.proteins,
      0
    );

    const token = localStorage.getItem("token"); // Adjust based on where you store the token

    try {
      const response = await axios.post(
        "http://localhost:4000/api/meal/addMeal",
        {
          email: userData.email,
          meals: [
            {
              name: mealName,
              totalCarbs,
              totalCalories,
              totalFats,
              quantity: totalQuantity,
              totalProteins,
              components,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Meal added successfully!");

      // Reset form
      setMealName("");
      setComponents([]);
    } catch (error) {
      console.error("Error adding meal:", error);
      alert("Failed to add meal. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold mb-8 text-center">Create Meal</h2>

      <div className="w-full max-w-md mx-auto bg-base-200 shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <input
            type="text"
            name="mealName"
            placeholder="Enter Meal Name..."
            value={mealName}
            onChange={handleMealNameChange}
            className="w-full pr-10 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <form className="relative mb-4" onSubmit={handleSearchSubmit}>
            <input
              placeholder="Search food item to add..."
              className="w-full pr-10 p-2  rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="search"
              type="search"
              value={search}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>

        {mealData && (
          <div className="p-4 space-y-4">
            <img
              src={mealImage || "/api/placeholder/150/150"}
              alt={search}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold">{currentFood}</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p>Quantities shown for 100g</p> <br />
              <p>
                Calories: {mealData.calories.value} {mealData.calories.unit}
              </p>
              <p>Carbs: {mealData.carbs.value} g</p>
              <p>Fats: {mealData.fat.value} g</p>
              <p>Proteins: {mealData.protein.value} g</p>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity (in grams):
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className="w-20 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleAddMeal}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add to Meal
            </button>
          </div>
        )}

        {components.length > 0 && (
          <div className="p-4 space-y-4">
            <h3 className="text-xl font-semibold">Meal Components</h3>
            <ul>
              {components.map((component, index) => (
                <li key={index}>
                  {component.name} - {component.quantity}g: <br />
                  {component.calories.toFixed(2)} cal <br />
                  {component.carbs.toFixed(2)}g carbs <br />
                  {component.fats.toFixed(2)}g fats <br />
                  {component.proteins.toFixed(2)}g proteins
                  <hr />
                </li>
              ))}
            </ul>
            <button
              onClick={handleSaveMeal}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Save Meal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealsPage;
