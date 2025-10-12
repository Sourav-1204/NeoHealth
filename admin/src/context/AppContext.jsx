import { createContext } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const currency = "$";
  
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const sloteDateFormat = (getDate) => {
    const dateArray = getDate.split("/");
    return (
      dateArray[0] + " " + months[Number(dateArray[1] - 1)] + " " + dateArray[2]
    );
  };

  const value = {
    calculateAge,
    sloteDateFormat,
    currency
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
