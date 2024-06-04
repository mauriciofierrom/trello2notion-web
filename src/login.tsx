// src/Home.tsx
import React, { useCallback } from "react";
import authgear, { PromptOption } from "@authgear/web";

const Login: React.FC = () => {
  const { REACT_APP_BASE_URL } = process.env;
  const startLogin = useCallback(() => {
    authgear
      .startAuthentication({
        redirectURI: `${REACT_APP_BASE_URL}/auth-redirect`,
        prompt: PromptOption.Login,
      })
      .then(
        () => {
          console.log("start authentication");
          // started authentication, user should be redirected to Authgear
        },
        (err) => {
          console.log(err);
          // failed to start authentication
        },
      );
  }, [REACT_APP_BASE_URL]);
  return (
    <div className="column">
      <button onClick={startLogin}>Login</button>
    </div>
  );
};

export default Login;
