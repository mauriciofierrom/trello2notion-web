// src/Home.tsx
import React, { useCallback } from 'react';
import authgear, { PromptOption } from '@authgear/web';

const Login: React.FC = () => {
  const startLogin = useCallback(() => {
    console.log("hey");

    authgear
      .startAuthentication({
        redirectURI: 'http://localhost:4000/auth-redirect',
        prompt: PromptOption.Login
      })
      .then(
        () => {
          console.log("start authentication")
          // started authentication, user should be redirected to Authgear
        },
        err => {
          console.log(err)
          // failed to start authentication
        }
      );
  }, []);
  return (
    <div className="column">
        <button onClick={startLogin}>Login</button>
    </div>
  );
}

export default Login;
