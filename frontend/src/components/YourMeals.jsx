import React, { useState } from "react";

const YourMeals = ({ meals }) => {
  const [activeMeal, setActiveMeal] = useState(null);

  const renderMealComponents = (components) => (
    <div className="p-5">
      {components.map((component) => (
        <div key={component.name}>
          <p className="text-5xl">{component.name}</p>
          <p className="pr-3">Carbs: {component.carbs.toFixed(1)} g</p>
          <p className="pr-3">Fats: {component.fats.toFixed(1)} g</p>
          <p className="pr-3">Proteins: {component.proteins.toFixed(1)} g</p>
          <p className="pr-3">Quantity: {component.quantity.toFixed(1)} g</p>
        </div>
      ))}
    </div>
  );

  const renderMeal = (meal) => (
    <>
      <button
        onClick={() => {
          setActiveMeal(meal);
          document.getElementById("my_modal_1").showModal();
        }}
        className="m-4 w-64"
      >
        <div className="collapse bg-base-200 p-6 flex flex-col items-start content-start hover:shadow-2xl">
          <div className=" text-4xl cursor-pointer mb-4 p-1">{meal.name}</div>
          <div className="flex flex-col items-start">
            <p className="px-0.5">
              Calories: {meal.totalCalories.toFixed(1)} kcal
            </p>
            <p className="px-0.5">Quantity: {meal.quantity.toFixed(1)} g</p>
            <p className="bg-lime-950 text-stone-400 px-0.5 rounded-sm">
              Protein: {meal.totalProteins.toFixed(1)} g
            </p>
            <p className="px-0.5">Carbs: {meal.totalCarbs.toFixed(1)} g</p>
            <p className="px-0.5">Fats: {meal.totalFats.toFixed(1)} g</p>
          </div>
        </div>
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {activeMeal?.name || "No Meal Selected"}
          </h3>
          {activeMeal && renderMealComponents(activeMeal.components)}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );

  return (
    <div>
      {meals.length > 0 ? (
        <>
          <h2 className="p-5 text-4xl text-center">Your Meals</h2>
          {meals.map(renderMeal)}
        </>
      ) : (
        <div className="p-5">You haven't added any meals yet.</div>
      )}
    </div>
  );
};

export default YourMeals;
