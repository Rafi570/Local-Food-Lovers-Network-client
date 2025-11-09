import React from 'react';
import Banner from '../../components/Banner/Banner';
import { useLoaderData } from 'react-router';
import Foods from '../Foods/Foods';
// import Loading from '../../components/Loading/Loading';

const Home = () => {
  const data =useLoaderData()
  console.log(data)
  return (
    <div>
      <Banner></Banner>
      <Foods data={data}></Foods>
     
    </div>
  );
};

export default Home;