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

  const onAuthentication = () => {
    // Set as logged in
    setIsLoggedIn(true);

    // Get the user info on first load
    try {
      authgear.fetchUserInfo().then((userInfo) => {
        console.log(userInfo);
        setEmail(userInfo.email || "");
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (
      !isLoggedIn &&
      authgear.accessToken &&
      authgear.sessionState === "AUTHENTICATED"
    ) {
      onAuthentication();
    }
    authgear.delegate = {
      onSessionStateChange: (container) => {
        const sessionState = container.sessionState;

        console.log(`onSessionStateChange: ${sessionState}`);

        if (sessionState === "AUTHENTICATED") {
          onAuthentication();
        } else {
          console.log("changed to logged out");
          setIsLoggedIn(false);
        }
      },
    };
  }, [setIsLoggedIn, setEmail, isLoggedIn]);

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
