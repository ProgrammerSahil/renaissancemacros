import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../../components/Banner";
import UserHome from "../../components/UserHome";
import Navbar from "../../components/Navbar";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          console.log("Fetching user data...");
          const response = await axios.get(
            "http://localhost:4000/api/user/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUserData(response.data.userData);
          setIsLoggedIn(true);

          let email = response.data.userData.email;

          console.log("Fetching user meals...");
          const mealResponse = await axios.get(
            "http://localhost:4000/api/meal/getMeals",
            {
              headers: { Authorization: `Bearer ${token}` },
              params: { email },
            }
          );

          if (mealResponse) {
            setMeals(mealResponse.data.meals);
          }
        } catch (error) {
          console.error("Error fetching user data:", error.response || error);
          if (error.response && error.response.status === 401) {
            console.log("Unauthorized: Clearing token");
            localStorage.removeItem("token");
          }
          setIsLoggedIn(false);
        }
      } else {
        console.log("No token found, user is not logged in");
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {}, [isLoggedIn, userData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    return (
      <>
        <Navbar userData={userData} />
        <UserHome userData={userData} mealData={meals} />
      </>
    );
  } else {
    return (
      <>
        <Navbar userData={{}} />
        <Banner />
      </>
    );
  }
};

export default Home;
