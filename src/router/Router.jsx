import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import AllReviews from "../components/AllReviews/AllReviews";
import Contact from "../components/Contact/Contact";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";





export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children:[
      {
        index: true,
        path: '/',
        Component: Home
      },
      {
        path: "/all-reviews",
        Component:AllReviews
      },
      {
        path: "/auth-login",
        Component: Login
      },
      {
        path: "/auth-register",
        Component: Register
      },
      {
        path: "/contact",
        Component: Contact
      }
    ]
  },
]);
