import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { TOKEN_KEY } from "../utils/constant";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribed = auth.onIdTokenChanged((user) => {
      console.log("From Auth", { user });
      if (user?.uid) {
        setUser(user);
        if (user.accessToken !== localStorage.getItem(TOKEN_KEY)) {
          localStorage.setItem(TOKEN_KEY, user.accessToken);
          window.location.reload();
        }

        setIsLoading(false);
        return;
      }

      // reset user info
      setIsLoading(false);
      setUser({});

      localStorage.removeItem(TOKEN_KEY);
      navigate("/login");
    });

    return () => {
      unsubscribed();
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
}
