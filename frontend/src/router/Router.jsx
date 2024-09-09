import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Signup from "../pages/signup/Signup";
import Onboard from "../pages/signup/Onboard";
import AboutUs from "../pages/aboutus/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/userOnboard",
        element: <Onboard />,
      },
      {
        path: "*",
        element: <h1>Page not found</h1>,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
    ],
  },
]);

export default router;
