import React, { useContext, createContext, useState } from "react";

// Creating a context
const MyContext = createContext();

// Create a provider for the context
const MyProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  return (
    <MyContext.Provider value={{ token, setToken }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook
const useMyContext = () => {
  return useContext(MyContext);
};

// Exporting
export { MyProvider, useMyContext };
