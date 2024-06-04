import React, { useState, ChangeEvent, FormEvent } from "react";
import { UploadFormProps } from "./types";
import { Errors } from "./errors";
import authgear from "@authgear/web";

export const UploadForm: React.FC<UploadFormProps> = ({
  action,
  setShowForm,
  email,
  setResult,
}) => {
  const [file, setFile] = useState<File>();
  const [errors, setErrors] = useState<string[]>([]);

  const URL = process.env.REACT_APP_ENTRYPOINT_URL || "http://localhost:8080";
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  function validateFile(file: File): string[] {
    const errors = [];

    if (file.size > MAX_FILE_SIZE) {
      errors.push("File is larger than 10 MB");
    }

    if (file.type !== "application/json") {
      errors.push("File is not supported. Please upload a JSON file.");
    }

    return errors;
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const errors = validateFile(event.target.files[0]);

      if (!errors || errors.length === 0) {
        setErrors([]);
        setFile(event.target.files[0]);
      } else {
        setErrors(errors);
      }
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      if (!file) {
        alert("File missing!");
        setShowForm(false);
        return;
      }

      formData.append("file", file, "file.json");
      formData.append("method", action);
      formData.append("email", email);

      await authgear.fetch(URL, {
        method: "POST",
        body: formData,
      });

      setShowForm(false);
      setResult({ ok: true, data: undefined });
    } catch (e) {
      setShowForm(false);
      setResult({ ok: false, error: `${e}` });
    }
  };

  return (
    <>
      <div className="container columns">
        <div className="column" />
        <div className="column">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="export-file">
                Export file
              </label>
              {errors.length > 0 && <Errors errors={errors} />}
              <div className="control">
                <input
                  className="input"
                  type="file"
                  id="export-file"
                  placeholder="Export file"
                  onChange={handleFileChange}
                  accept="application/json"
                />
              </div>
            </div>

            <button
              className="button is-primary"
              type="submit"
              disabled={!file}
            >
              Upload!
            </button>
          </form>
        </div>
        <div className="column" />
      </div>
    </>
  );
};
