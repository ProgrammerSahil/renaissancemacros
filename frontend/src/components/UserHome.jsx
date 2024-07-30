import React, { useState, useEffect } from "react";
import BasicInfo from "./userHomeComponents/BasicInfo";
import MealsPage from "./userHomeComponents/MealsPage";

const UserHome = ({ userData, mealData }) => {
  const [menuPage, setMenuPage] = useState("basicInfo");
  const [content, setContent] = useState(null);

  const renderMenu = () => {
    return (
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <a
              className={menuPage === "basicInfo" ? "bg-slate-950" : ""}
              onClick={() => setMenuPage("basicInfo")}
            >
              Basic Info
            </a>
          </li>
          <li>
            <a
              className={menuPage === "meals" ? "bg-slate-950" : ""}
              onClick={() => setMenuPage("meals")}
            >
              Create Meals
            </a>
          </li>
        </ul>
      </div>
    );
  };

  const renderContent = () => {
    switch (menuPage) {
      case "basicInfo":
        return <BasicInfo userData={userData} meals={mealData} />;
      case "meals":
        return <MealsPage userData={userData} />;
      default:
        return <div>Welcome!</div>;
    }
  };

  useEffect(() => {
    setContent(renderContent());
  }, [menuPage]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center p-10">
        {content}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      {renderMenu()}
    </div>
  );
};

export default UserHome;
