import React, { createContext, useEffect, useState, useMemo } from "react";
import authgear from "@authgear/web";

interface UserContextValue {
  isLoggedIn: boolean;
  email: string;
}

export const UserContext = createContext<UserContextValue>({
  isLoggedIn: false,
  email: "",
});

interface UserContextProviderProps {
  children: React.ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    authgear.delegate = {
      onSessionStateChange: (container) => {
        const sessionState = container.sessionState;
        if (sessionState === "AUTHENTICATED") {
          setIsLoggedIn(true);
          try {
            authgear.fetchUserInfo().then((userInfo) => {
              console.log(userInfo);
              setEmail(userInfo.email || "");
            });
          } catch (e) {
            console.log(e);
          }
        } else {
          setIsLoggedIn(false);
        }
      },
    };
  }, [setIsLoggedIn, setEmail]);

  const contextValue = useMemo<UserContextValue>(() => {
    return {
      isLoggedIn,
      email,
    };
  }, [isLoggedIn, email]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
