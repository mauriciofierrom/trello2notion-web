import { SetStateAction, Dispatch } from "react";

export type Result<T, E> = { ok: true; data: T } | { ok: false; error: E };

export interface ResultProps {
  result: Result<Response, string> | undefined;
}

export interface UploadFormProps {
  action: Action;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setResult: Dispatch<SetStateAction<Result<Response, string> | undefined>>;
  email: string;
}

export interface ErrorsProps {
  errors: string[];
}

export interface ConversionResultProps {
  action: Action;
  result: Result<Response, string> | undefined;
}

export enum Action {
  // eslint-disable-next-line no-unused-vars
  Markdown = "markdown",
  // eslint-disable-next-line no-unused-vars
  Notion = "notion",
}
