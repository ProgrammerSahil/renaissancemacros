import React from "react";

const YourMeals = (meals) => {
  console.log(meals.meals);
  const mapMealComponents = (component) => {
    return (
      <div className="p-5" key={component.name}>
        <p>
          <p className="text-5xl">{component.name}</p>
          <p className="pr-3">Carbs: {component.carbs}</p>
          <p className="pr-3">Fats: {component.fats}</p>
          <p className="pr-3">Proteins: {component.proteins}</p>
        </p>
      </div>
    );
  };
  const mapMeals = (meal) => {
    return (
      <>
        <button
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <div className="collapse  bg-base-200">
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
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{meal.name}</h3>
            <div>{meal.components.map(mapMealComponents)}</div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </>
    );
  };
  return (
    <>
      <h2 className="p-5 text-4xl">Your Meals</h2>
      <div>{meals.meals.map(mapMeals)}</div>
    </>
  );
};

export default YourMeals;
