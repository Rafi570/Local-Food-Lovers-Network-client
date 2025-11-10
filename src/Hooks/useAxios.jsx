import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://server-site-assingment-10.vercel.app",
  
});

const useAxios =()=>{
  return axiosInstance
}
export default useAxios





// foodImage
// : 
// "lll"
// foodName
// : 
// "sosa"
// location
// : 
// "h"
// rating
// : 
// "2"
// restaurantName
// : 
// "rr"
// reviewText
// : 
// "jjjj"