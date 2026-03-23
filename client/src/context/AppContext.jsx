import { createContext, useState, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate()

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setEducator]= useState(true)

  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {  // ✅ courseRatings not courseRating
      return 0;
    }
    let totalRating = 0
    course.courseRatings.forEach(rating => {  // ✅ courseRatings not courseRating
      totalRating += rating.rating
    })
    return (totalRating / course.courseRatings.length).toFixed(1)
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating ,isEducator,setEducator
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};