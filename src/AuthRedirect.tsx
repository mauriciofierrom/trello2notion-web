import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import authgear from "@authgear/web";

const AuthRedirect: React.FC = () => {
  const usedToken = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function updateToken() {
      try {
        await authgear.finishAuthentication();
      } finally {
        if (authgear.accessToken) {
          localStorage.setItem("t2n-token", authgear.accessToken);

          const baseContainer = Object.getOwnPropertyDescriptor(
            authgear,
            "baseContainer",
          )?.value;
          localStorage.setItem(
            "t2n-token-expire-at",
            baseContainer.expireAt.toDateString(),
          );
        }

        navigate("/");

        usedToken.current = true;
      }
    }

    if (!usedToken.current) {
      updateToken().catch((e) => console.error(e));
    }
  }, [navigate]);

  return <></>;
};

export default AuthRedirect;
