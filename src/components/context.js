import React from "react";
import generateTable from "./generateTable";

export const MyContext = React.createContext();
export const MyProvider = ({ children }) => {
  const arr = generateTable();
  const [scheduleData, setScheduleData] = React.useState(arr);
  const [startDate, setStartDate] = React.useState(new Date());
  const [courses, setCourses] = React.useState({
    // COMP2511: "teal",
    // COMP3331: "messenger",
    // MATH2801: "pink",
  });

  const [title, setTitle] = React.useState("");
  const value = {
    scheduleData,
    setScheduleData,
    courses,
    setCourses,
    title,
    setTitle,
    startDate,
    setStartDate,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
