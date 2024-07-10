import React, { useState } from "react";
import axios from "axios";

const MealsPage = () => {
  const [search, setSearch] = useState("");
  const [mealData, setMealData] = useState(null);
  const [mealImage, setMealImage] = useState(null);
  const [mealName, setMealName] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
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
      let firstImage = imageResponse.data.results[0];
      setMealImage(firstImage.urls.small);
    } catch (error) {
      console.error("Error fetching meal data:", error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMealData(search);
    setMealName(mealData.name);
  };

  return (
    <>
      <form className="relative" onSubmit={handleSearchSubmit}>
        <input
          placeholder="Search Food..."
          className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
          name="search"
          type="search"
          value={search}
          onChange={handleSearchChange}
        />
        <svg
          className="size-6 absolute top-3 right-3 text-gray-500"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
      </form>

      {mealData && (
        <div className="card card-compact bg-base-100 shadow-xl mt-20 p-8">
          <figure>
            <img
              src={mealImage || "https://via.placeholder.com/150"}
              alt={mealName}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{search}</h2>
            <p>
              Calories: {mealData.calories.value} {mealData.calories.unit}
            </p>
            <p>Carbs: {mealData.carbs.value} g</p>
            <p>Fats: {mealData.fat.value} g</p>
            <p>Proteins: {mealData.protein.value} g</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MealsPage;
