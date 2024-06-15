import React, {useContext, createContext, useState, useEffect} from 'react';

// Creating a context
const MyContext = createContext ();

// Create a provider for the context
const MyProvider = ({children}) => {
  const [token, setToken] = useState (null);
  const [user, setUser] = useState ('');
  useEffect (
    () => {
      setToken (localStorage.getItem ('token'));
      setUser (localStorage.getItem ('user'));
    },
    [token, user]
  );
  async function handleLogout () {
    await localStorage.removeItem ('token');
    await localStorage.removeItem ('user');
  }
  return (
    <MyContext.Provider value={{token, user, handleLogout}}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook
const useMyContext = () => {
  return useContext (MyContext);
};

// Exporting
export {MyProvider, useMyContext};
