import { createContext, useContext, useEffect, useState } from "react";
import { constants } from "../util/constant";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    localStorage.getItem(constants.AUTH)
      ? JSON.parse(localStorage.getItem(constants.AUTH))
      : null
  );

  useEffect(() => {
    if (auth) {
      localStorage.setItem(constants.AUTH, JSON.stringify(auth));
    } else {
      localStorage.clear();
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
