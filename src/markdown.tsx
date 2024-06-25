import React, { useState, useContext } from "react";
import { Action, Result } from "./types";
import { UploadForm } from "./form";
import { ConversionResult } from "./result";
import { Link } from "react-router-dom";
import { UserContext } from "./UserProvider";

export const Markdown: React.FC = () => {
  const { email } = useContext(UserContext);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [result, setResult] = useState<Result<Response, string>>();

  return (
    <div className="content">
      <h2>Markdown</h2>
      <p>
        Upload your Trello JSON export to convert it to a markdown (.md) file.
      </p>
      {showForm && (
        <UploadForm
          action={Action.Markdown}
          email={email}
          setShowForm={setShowForm}
          setResult={setResult}
        />
      )}
      {!showForm && result && (
        <ConversionResult action={Action.Markdown} result={result} />
      )}
      <Link to={`/`}>Go back</Link>
    </div>
  );
};
