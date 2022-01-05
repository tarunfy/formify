import { useEffect, useState, createContext } from "react";
import { authService } from "../services";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const res = await authService.getCurrentUser();
      if (res.status === 200) {
        setCurrentUser(res.data.user);
      }
      setFetching(false);
    } catch (err) {
      setFetching(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ fetching, currentUser, setCurrentUser, setFetching }}
    >
      {!fetching && children}
    </AuthContext.Provider>
  );
};
