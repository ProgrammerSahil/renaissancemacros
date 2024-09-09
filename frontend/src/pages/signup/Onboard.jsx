import React, { useState } from "react";
import axios from "axios";

const Onboard = () => {
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100;
  const maxYear = currentYear - 14;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    height: "",
    currentWeight: "",
    targetWeight: "",
    activityLevel: "",
    weightGoal: "",
    dietaryRestrictions: [],
    foodAllergies: [],
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelect = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    if (selectedValues.includes("none")) {
      setFormData({ ...formData, [name]: ["none"] });
    } else {
      setFormData({ ...formData, [name]: selectedValues });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      console.log("inside register request sending");
      const response = await axios.post(
        "http://localhost:4000/api/user/register",
        formData
      );
      console.log("User registered successfully:", response.data);
      window.location.href = "/signup";
    } catch (error) {
      console.log(error);
      if (error.response) {
        setErrorMessage(
          error.response.data.message || `An error occured during registration`
        );
      } else if (error.request) {
        setErrorMessage("No response from server. Please try again later.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const inputStyle =
    "w-full px-3 py-2 border rounded-md bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="p-20">
      {errorMessage && (
        <div
          className="error-message"
          style={{ color: "red", marginTop: "10px" }}
        >
          {errorMessage}
        </div>
      )}
      <div className="mx-auto max-w-[800px] bg-white rounded-md shadow-lg drop-shadow-md p-10">
        <h2 className="text-3xl font-bold mb-8 ">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
              className={inputStyle}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              className={inputStyle}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <input
            type="date"
            name="dateOfBirth"
            onChange={handleChange}
            required
            className={inputStyle}
          />
          <select
            name="gender"
            onChange={handleChange}
            required
            className={inputStyle}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              onChange={handleChange}
              required
              className={inputStyle}
            />
            <input
              type="number"
              name="currentWeight"
              placeholder="Current Weight (kg)"
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>
          <select
            name="activityLevel"
            onChange={handleChange}
            required
            className={inputStyle}
          >
            <option value="">Select Activity Level</option>
            <option value="sedentary">Sedentary</option>
            <option value="lightly active">Lightly Active</option>
            <option value="moderately active">Moderately Active</option>
            <option value="very active">Very Active</option>
            <option value="extra active">Extra Active</option>
          </select>
          <select
            name="weightGoal"
            onChange={handleChange}
            required
            className={inputStyle}
          >
            <option value="">Select Weight Goal</option>
            <option value="lose">Lose Weight</option>
            <option value="gain">Gain Weight</option>
            <option value="maintain">Maintain Weight</option>
          </select>
          <div>
            <label
              htmlFor="dietaryRestrictions"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Dietary Restrictions (Hold Ctrl/Cmd to select multiple)
            </label>
            <select
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              multiple
              onChange={handleMultiSelect}
              className={`${inputStyle} h-32`}
            >
              <option value="none">None</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-free</option>
              <option value="lactose-free">Lactose-free</option>
              <option value="kosher">Kosher</option>
              <option value="halal">Halal</option>
            </select>
          </div>
          <input
            type="text"
            name="foodAllergies"
            placeholder="Food Allergies (comma-separated)"
            onChange={(e) =>
              setFormData({
                ...formData,
                foodAllergies: e.target.value
                  .split(",")
                  .map((item) => item.trim()),
              })
            }
            className={inputStyle}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboard;
