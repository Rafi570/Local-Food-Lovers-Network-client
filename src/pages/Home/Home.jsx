import React from 'react';
import Banner from '../../components/Banner/Banner';
// import { useLoaderData } from 'react-router';
import Foods from '../Foods/Foods';
// import TopLocalFoodSpots from '../../components/TopLocalFoodSpots/TopLocalFoodSpots';
import LocalFlavorHighlights from '../../components/LocalFlavorHighlights/LocalFlavorHighlights';
// import AddReview from '../AddReview/AddReview';
// import Loading from '../../components/Loading/Loading';

const Home = () => {
  // const data =useLoaderData()
  // console.log(data)
  return (
    <div>
      <Banner></Banner>
      <Foods></Foods>
      {/* <TopLocalFoodSpots></TopLocalFoodSpots> */}
      <LocalFlavorHighlights></LocalFlavorHighlights>
      {/* <AddReview></AddReview> */}
     
    </div>
  );
};

export default Home;