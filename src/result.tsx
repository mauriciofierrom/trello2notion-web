import React from "react";
import { Action, Result, ConversionResultProps } from "./types";

const successMessage = (action: Action): string => {
  return `Your export file is been converted to ${action}. Check your email for a link.`;
};

const errorMessage = (error: string): string =>
  `Something wrong happened with your request: ${error}. Please try again.`;

const resultMessage = (
  result: Result<void, string>,
  action: Action,
): string => {
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
  return <p>{resultMessage(result, action)}</p>;
};
