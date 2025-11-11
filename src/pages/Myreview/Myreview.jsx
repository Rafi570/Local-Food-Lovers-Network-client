import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import useAxios from '../../Hooks/useAxios';

const Myreview = () => {
  const {user}=use(AuthContext)
  const [review,setReview]=useState([])
  const axiosInstance =useAxios()
  useEffect(()=>{
    axiosInstance.get(`/review?email=${user.email}`).then(data=>{
      setReview(data.data)
    })
  },[user,axiosInstance])
  console.log(review)
  return (
    <div>
      
    </div>
  );
};

export default Myreview;