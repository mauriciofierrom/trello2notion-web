import React, { useState, useContext, useEffect } from "react";
import { Action, Result } from "./types";
import { UploadForm } from "./form";
import { ConversionResult } from "./result";
import { Link } from "react-router-dom";
import { UserContext } from "./UserProvider";
import { notionCode } from "./service";

export const Notion: React.FC = () => {
  const { email } = useContext(UserContext);
  const action: Action = Action.Notion;
  const [showForm, setShowForm] = useState<boolean>(false);
  const [result, setResult] = useState<Result<Response, string>>();
  const [notionWorkspace, setNotionWorkspace] = useState<string>("");

  useEffect(() => {
    const workspace = window.localStorage.getItem("notionWorkspace");
    if (workspace) {
      setNotionWorkspace(workspace);
      setShowForm(true);
      console.log(workspace);
    }
  }, []);

  useEffect(() => {
    async function postNotionCode() {
      const params = new URLSearchParams(document.location.search);
      const codeParam = params.get("code");

      if (!notionWorkspace && codeParam) {
        // TODO: This should show loading while posting

        try {
          const response = await notionCode(codeParam, email);
          const { workspaceName } = await response.json();
          setNotionWorkspace(workspaceName);
          window.localStorage.setItem("notionWorkspace", workspaceName);
          setShowForm(true);
        } catch (e) {
          setResult({ ok: false, error: `${e}` });
        }
      }
    }
    postNotionCode();
  }, [notionWorkspace]);

  return (
    <div className="content">
      <h2>Notion</h2>
      <p>Upload your Trello JSON export to create Notion pages from it.</p>
      {showForm && !result && (
        <UploadForm
          action={action}
          email={email}
          setShowForm={setShowForm}
          setResult={setResult}
        />
      )}
      {!showForm && !result && (
        <div className="box">
          <p>Pick a Page in Notion to create the board:</p>
          <a
            href="https://api.notion.com/v1/oauth/authorize?client_id=3c603b55-7089-4c20-abb8-69a0730c0146&response_type=code&owner=user&redirect_uri=https%3A%2F%2Ftrello2notion-web.vercel.app%2Fnotion"
            className="button is-link"
          >
            Pick Page
          </a>
        </div>
      )}
      {result && !showForm && (
        <ConversionResult action={action} result={result} />
      )}
      <Link to={`/`}>Go back</Link>
    </div>
  );
};
