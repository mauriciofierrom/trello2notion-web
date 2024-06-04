import React from "react";
import { ErrorsProps } from "./types";

export const Errors: React.FC<ErrorsProps> = ({ errors }) => {
  if (!errors) {
    return null;
  }

  return (
    <div className="notification is-danger">
      <ul>
        {errors.map((key: string, index: number) => (
          <li key={index}>{key}</li>
        ))}
      </ul>
    </div>
  );
};
