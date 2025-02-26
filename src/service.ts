import authgear from "@authgear/web";

const ENTRY_POINT_URL =
  process.env.REACT_APP_ENTRYPOINT_URL || "http://localhost:8080";

export const fileUpload = async (formData: FormData) => {
  return authgear.fetch(ENTRY_POINT_URL, {
    method: "POST",
    body: formData,
  });
};

export const notionCode = async (code: string, email: string) => {
  return authgear.fetch(ENTRY_POINT_URL, {
    method: "POST",
    body: JSON.stringify({ notionCode: code, email: email }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
