import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Loading from "../components/Loading/Loading";
import PrivateRoute from "./PrivateRoute.jsx/PrivateRoute";
import DetailsReview from "../components/DetailsReview/DetailsReview";

import ErrorPage from "../pages/ErrorPage/ErrorPage";


import MyFavorites from "../pages/MyFavorites/MyFavorites";
import AboutUs from "../components/AboutUs/AboutUs";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddReview from "../pages/Dashboard/AddReview/AddReview";
import AllReviews from "../pages/Dashboard/AllReviews/AllReviews";
import Myreview from "../pages/Dashboard/Myreview/Myreview";
import EditReview from "../pages/Dashboard/EditReview/EditReview";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
        // loader : async ()=>{
        //   const res =await fetch ("https://server-site-assingment-10.vercel.app/best-foods")
        //   return res.json()
        // },
        // hydrateFallbackElement: <Loading></Loading>
      },
      // {
      //   path: "/all-reviews",
      //   Component: AllReviews,
      //   loader: async () => {
      //     const res = await fetch(
      //       "https://server-site-assingment-10.vercel.app/review"
      //     );
      //     return res.json();
      //   },
      //   hydrateFallbackElement: <Loading></Loading>,
      // },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/details-review/:id",
        loader: ({ params }) =>
          fetch(
            `https://server-site-assingment-10.vercel.app/foods/${params.id}`
          ).then((res) => res.json()),
        hydrateFallbackElement: <Loading></Loading>,
        element: (
          <PrivateRoute>
            <DetailsReview></DetailsReview>
          </PrivateRoute>
        ),
        // Component: DetailsReview,
      },

      {
        path: "/auth-login",
        Component: Login,
      },
      {
        path: "/auth-register",
        Component: Register,
      },

      {
        path: "/my-favorites",
        element: (
          <PrivateRoute>
            <MyFavorites></MyFavorites>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "all-reviews",
        Component: AllReviews,
        loader: async () => {
          const res = await fetch(
            "https://server-site-assingment-10.vercel.app/review"
          );
          return res.json();
        },
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "add-review",
        element: (
          <PrivateRoute>
            <AddReview></AddReview>
          </PrivateRoute>
        ),
      },
      {
        path: "my-review",
        element: (
          <PrivateRoute>
            <Myreview></Myreview>
          </PrivateRoute>
        ),
      },
      {
        path: "edit-review/:id",
        element: (
          <PrivateRoute>
            <EditReview></EditReview>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
