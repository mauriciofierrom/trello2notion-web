import React from "react";
import { Action, Result, ConversionResultProps } from "./types";

const successMessage = (action: Action): React.JSX.Element => {
  return (
    <div className="notification is-primary">
      Your export file is been converted to ${action}. Check your email for a
      link.
    </div>
  );
};

const errorMessage = (error: string): React.JSX.Element => {
  return (
    <div className="notification is-danger">
      Something wrong happened with your request: {error}. Please try again.
    </div>
  );
};

const resultMessage = (
  result: Result<Response, string> | undefined,
  action: Action,
): React.JSX.Element => {
  if (!result) {
    return <p>No Result</p>;
  }

  if (result.ok) {
    return successMessage(action);
  } else {
    return errorMessage(result.error);
  }
};

export const ConversionResult: React.FC<ConversionResultProps> = ({
  action,
  result,
}) => {
  return <div>{resultMessage(result, action)}</div>;
};
