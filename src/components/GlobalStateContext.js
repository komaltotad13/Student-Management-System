import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [stats, setStats] = useState({ students: 0, teachers: 0, grades: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/grades/stats"
      );
      setStats(response.data);
    } catch (error) {
      console.error("There was an error fetching the stats!", error);
    }
  };

  const updateStats = async () => {
    await fetchStats();
  };

  return (
    <GlobalStateContext.Provider value={{ stats, updateStats }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateProvider };
