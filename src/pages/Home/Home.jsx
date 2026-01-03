import React from "react";
import Banner from "../../components/Banner/Banner";
// import { useLoaderData } from 'react-router';
import Foods from "../Foods/Foods";
// import TopLocalFoodSpots from '../../components/TopLocalFoodSpots/TopLocalFoodSpots';
import LocalFlavorHighlights from "../../components/LocalFlavorHighlights/LocalFlavorHighlights";
import Add2 from "../../components/Add2/Add2";


const Home = () => {

  return (
    <div>
      <Banner></Banner>
      <Foods></Foods>
      {/* <TopLocalFoodSpots></TopLocalFoodSpots> */}
      <Add2></Add2>
      <LocalFlavorHighlights></LocalFlavorHighlights>

      {/* <AddReview></AddReview> */}
    </div>
  );
};

export default Home;
