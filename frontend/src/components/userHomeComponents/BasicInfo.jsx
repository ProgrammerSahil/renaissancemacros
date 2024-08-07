import React from "react";
import YourMeals from "../YourMeals";

const BasicInfo = ({ userData, meals }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("en-US", options);
  }

  const showWeightHistory = (weightHistory) => (
    <div>
      {weightHistory.map((weight) => (
        <p>
          Weighed {weight.weight} Kg on {formatDate(weight.date)}
        </p>
      ))}
    </div>
  );
  const renderAdditionalInfoModal = (userData) => {
    return (
      <>
        <div className="text-6xl mb-6">{userData.firstName}</div>
        <div className="bg-base-300 p-4 mb-4 rounded-lg">
          <h2 className="text-4xl mb-4">Caloric Data</h2>
          <p className="mb-1">
            Total daily energy expenditure(TDEE): {userData.tdee} kcal
          </p>
          <p className="mb-1">Base Metabolic Rate(BMR): {userData.bmr} kcal</p>
          <p className="mb-1">
            Daily calorie target for your weight goals:{" "}
            {userData.dailyCalorieTarget} kcal
          </p>
        </div>
        <div className="bg-base-300 p-4 rounded-lg">
          <h2 className="text-4xl mb-4">Weight History</h2>
          <p className="mb-1 text-xl">
            Current Weight: {userData.currentWeight} kg
          </p>
          <p>History: </p>
          <div>{showWeightHistory(userData.weightHistory)}</div>
        </div>
      </>
    );
  };

  const weightLastUpdateString = userData.weightHistory.at(-1).date;
  const date = new Date(weightLastUpdateString);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return (
    <>
      <div
        className="stats shadow bg-base-200 cursor-pointer"
        onClick={() => {
          document.getElementById("my_modal_0").showModal();
        }}
      >
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="inline-block h-8 w-8"
            >
              <path d="M310.3 97.25c-8-3.5-17.5 .25-21 8.5L255.8 184C233.8 184.3 216 202 216 224c0 22.12 17.88 40 40 40S296 246.1 296 224c0-10.5-4.25-20-11-27.12l33.75-78.63C322.3 110.1 318.4 100.8 310.3 97.25zM448 64h-56.23C359.5 24.91 310.7 0 256 0S152.5 24.91 120.2 64H64C28.75 64 0 92.75 0 128v320c0 35.25 28.75 64 64 64h384c35.25 0 64-28.75 64-64V128C512 92.75 483.3 64 448 64zM256 304c-70.58 0-128-57.42-128-128s57.42-128 128-128c70.58 0 128 57.42 128 128S326.6 304 256 304z" />
            </svg>
          </div>
          <div className="stat-title">Current Weight</div>
          <div className="stat-value">{userData.currentWeight} Kgs</div>
          <div className="stat-desc">Last Updated: {formattedDate}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="inline-block h-8 w-8"
            >
              <path d="M0 192c0-35.3 28.7-64 64-64c.5 0 1.1 0 1.6 0C73 91.5 105.3 64 144 64c15 0 29 4.1 40.9 11.2C198.2 49.6 225.1 32 256 32s57.8 17.6 71.1 43.2C339 68.1 353 64 368 64c38.7 0 71 27.5 78.4 64c.5 0 1.1 0 1.6 0c35.3 0 64 28.7 64 64c0 11.7-3.1 22.6-8.6 32H8.6C3.1 214.6 0 203.7 0 192zm0 91.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z" />
            </svg>
          </div>
          <div className="stat-title">Calories Intake Goal</div>
          <div className="stat-value">{userData.dailyCalorieTarget}</div>
          <div className="stat-desc">Goal: {userData.weightGoal} weight</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="inline-block h-8 w-8"
            >
              <path d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" />
            </svg>
          </div>
          <div className="stat-title">Macros Goals</div>
          <div className="stat-desc">
            <u>Protein: {userData.macroTargets.protein}g</u>
          </div>
          <div className="stat-desc">Fats: {userData.macroTargets.fats}g</div>
          <div className="stat-desc">Carbs: {userData.macroTargets.carbs}g</div>
        </div>
      </div>
      <dialog id="my_modal_0" className="modal">
        <div className="modal-box">
          {renderAdditionalInfoModal(userData)}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <YourMeals meals={meals} />
    </>
  );
};

export default BasicInfo;
