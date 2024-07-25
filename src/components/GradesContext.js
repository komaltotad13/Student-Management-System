// GradesContext.js
import React, { createContext, useState } from "react";

export const GradesContext = createContext();

export const GradesProvider = ({ children }) => {
  const [grades, setGrades] = useState([]);
  const [currentGrade, setCurrentGrade] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <GradesContext.Provider
      value={{
        grades,
        setGrades,
        currentGrade,
        setCurrentGrade,
        loading,
        setLoading,
      }}
    >
      {children}
    </GradesContext.Provider>
  );
};
