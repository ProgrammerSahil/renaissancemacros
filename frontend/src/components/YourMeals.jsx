import React from "react";

const YourMeals = (meals) => {
  console.log(meals.meals);
  const mapMeals = (meal) => {
    return (
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium" key={meal._id}>
          {meal.name}
        </div>
        <div className="collapse-content">
          <p>Calories: {meal.totalCalories} kcal</p>
          <p>Protein: {meal.totalProteins} g</p>
          <p>Carbs: {meal.totalCarbs} g</p>
          <p>Fats: {meal.totalFats} g</p>
        </div>
      </div>
    );
  };
  return (
    <>
      <h2>Your Meals</h2>
      <div>{meals.meals.map(mapMeals)}</div>
    </>
  );
};

export default YourMeals;
