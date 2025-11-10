import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import AllReviews from "../components/AllReviews/AllReviews";
import Contact from "../components/Contact/Contact";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Loading from "../components/Loading/Loading";
import PrivateRoute from "./PrivateRoute.jsx/PrivateRoute";
import DetailsReview from "../components/DetailsReview/DetailsReview";
import AddReview from "../pages/AddReview/AddReview";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement:<ErrorPage></ErrorPage>,
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
      {
        path: "/all-reviews",
        Component: AllReviews,
      },
      {
        path: "/details-review/:id",
        loader: ({ params }) =>
          fetch(`https://server-site-assingment-10.vercel.app/foods/${params.id}`).then((res) =>
            res.json()
          ),
          element: (
            <PrivateRoute>
              <DetailsReview></DetailsReview>
            </PrivateRoute>
          )
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
        path: "/add-review",
        Component: AddReview,
      },
    ],
  },
]);
